import { MarkerClusterer } from '@react-google-maps/api';
import React, { createRef } from 'react'
import { mapLoader, getCenters } from '../utils';
import { message } from 'antd';


class GoogleMap extends React.Component {
  constructor() {
    super();
    this.googleMapRef = createRef();
    this.map = undefined;
    this.directionsService_1 = undefined;
    this.directionsService_2 = undefined;
    this.directionsService = undefined;
    this.directionsRenderer = undefined;
    this.pickupMarker = undefined;
    this.sendtoMarker = undefined;
    this.polyline = undefined;
    this.center_0_Marker = undefined;
    this.center_1_Marker = undefined;
    this.center_2_Marker = undefined;
  
    this.opt = {
      zoom: 14,
        center: {
          lat: 37.77493,
          lng: -122.419415,
        },
        zoomControl: true,
        scaleControl: true,
        disableDefaultUI: true,
    };
  }

  componentDidMount() {
    // alert('didMount')
    mapLoader().then(() => {
      console.log(this.googleMapRef.current);
      this.map = new window.google.maps.Map(this.googleMapRef.current, this.opt);
      console.log(this.googleMapRef.current);
      this.directionsService = new window.google.maps.DirectionsService();
      this.directionsRenderer_1 = new window.google.maps.DirectionsRenderer();
      this.directionsRenderer_2 = new window.google.maps.DirectionsRenderer()
      this.directionsRenderer_1.setMap(this.map)
      this.directionsRenderer_2.setMap(this.map)
      this.pickupMarker = new window.google.maps.Marker()
      this.sendtoMarker = new window.google.maps.Marker()
      this.center_0_Marker = new window.google.maps.Marker()
      this.center_1_Marker = new window.google.maps.Marker()
      this.center_2_Marker = new window.google.maps.Marker()
      this.polyline 
      = new window.google.maps.Polyline({
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.4,
        strokeWeight: 8,
      })
    })
    getCenters().then((res) => {
        if (res.status === 200) {
            const centerslatlng = res.data
            console.log(centerslatlng);
            for (let index = 0; index < centerslatlng.length; index++) {
              let centerInfo = centerslatlng[index];
              if (centerInfo.id === 'CENTER_0') {
                this.center_0_Marker.setMap(null);
                this.center_0_Marker.setPosition({lat: centerInfo.centerLat, lng: centerInfo.centerLng})
                this.center_0_Marker.setMap(this.map)
              } else if (centerInfo.id === 'CENTER_1') {
                this.center_1_Marker.setMap(null);
                this.center_1_Marker.setPosition({lat: centerInfo.centerLat, lng: centerInfo.centerLng})
                this.center_1_Marker.setMap(this.map)
              } else if (centerInfo.id === 'CENTER_2') {
                this.center_2_Marker.setMap(null);
                this.center_2_Marker.setPosition({lat: centerInfo.centerLat, lng: centerInfo.centerLng})
                this.center_2_Marker.setMap(this.map)
              }
            }
        }
    })
    .catch((err) => {
        console.log("get dispatch centers failed: ", err.message);
        message.error('Get Dispatch centers failed');
    })
  }

  
  componentDidUpdate() {
    // alert('didUpdate')
    this.pickupMarker.setMap(null)
    this.sendtoMarker.setMap(null)
    this.polyline.setMap(null)
    this.setMarker(this.pickupMarker, this.props.pickup)
    this.setMarker(this.sendtoMarker, this.props.sendto)
    const locations = [this.props.pickup, this.props.sendto, {lat: 37.77493, lng: -122.419415}]
    if (this.props.showDrone) {
      this.drawLine(this.polyline, locations)
    }
    if (this.props.showRobot) {
      this.drawDirection(this.directionsService, this.directionsRenderer_1, [locations[0], locations[1]]);
      this.drawDirection(this.directionsService, this.directionsRenderer_2, [locations[1], locations[2]]);
    }
  }


  setMarker = (marker, latlng) => {
    console.log(latlng)
    marker.setPosition(latlng)
    marker.setMap(this.map)
  }

  drawLine = (polyline, locations) => {
    polyline.setPath(locations)
    polyline.setMap(this.map)
  }

  drawDirection = (directionsService, directionsRenderer, locations) => {
    directionsService.route(
      {
        origin: locations[0],
        destination: locations[1],
        travelMode: window.google.maps.TravelMode.WALKING,
      }, 
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response)
        } else {
          window.alert("Directions request failed due to " + status)
        }
      }
    )
  }


  render = () => {
    // alert('render')
    // alert(this.googleMapRef.current);
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
}

export default GoogleMap;