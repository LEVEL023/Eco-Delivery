import { MarkerClusterer } from '@react-google-maps/api';
import React, { createRef } from 'react'
import { mapLoader } from '../utils';

class GoogleMap extends React.Component {
  googleMapRef = createRef();

  map;
  directionsService;
  directionsRenderer;
  pickupMarker;
  sendtoMarker;
  polyline;

  opt = {
    zoom: 14,
      center: {
        lat: 37.77493,
        lng: -122.419415,
      },
      zoomControl: true,
      scaleControl: true,
      disableDefaultUI: true,
  }


  componentDidMount() {
    mapLoader().then(() => {
      this.map = new window.google.maps.Map(this.googleMapRef.current, this.opt)
      this.directionsService = new window.google.maps.DirectionsService()
      this.directionsRenderer = new window.google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(this.map)
      this.pickupMarker = new window.google.maps.Marker()
      this.sendtoMarker = new window.google.maps.Marker()
      this.polyline 
      = new window.google.maps.Polyline({
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.4,
        strokeWeight: 8,
      })
    })
  }

  
  componentDidUpdate() {
    this.pickupMarker.setMap(null)
    this.sendtoMarker.setMap(null)
    this.polyline.setMap(null)
    this.setMarker(this.pickupMarker, this.props.pickup)
    this.setMarker(this.sendtoMarker, this.props.sendto)
    const locations = [this.props.pickup, this.props.sendto]
    if (this.props.showDrone) {
      this.drawLine(this.polyline, locations)
    }
    if (this.props.showRobot) {
      this.drawDirection(this.directionsService, this.directionsRenderer, locations)
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