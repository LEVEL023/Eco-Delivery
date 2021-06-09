import React, { createRef } from 'react'
import { mapLoader } from '../utils';
import { message } from 'antd';
import { 
  NUM_OF_WAREHOUSES, 
  MAP_STYLE_JSON,
  SAN_FRANCISCO_LAT_LNG,
  CENTER_1_LAT_LNG,
  CENTER_2_LAT_LNG,
  CENTER_3_LAT_LNG } from '../constants';

const warehouseMarkerOpt = {
  path: "M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z",
  fillColor: "#007844",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: 'white',
  rotation: 0,
  scale: 0.045,
}
const mapInitOpt = {
    zoom: 10,
    center: SAN_FRANCISCO_LAT_LNG,
    zoomControl: true,
    scaleControl: true,
    disableDefaultUI: true,
    styles: MAP_STYLE_JSON,
};
const centersLatlng = [CENTER_1_LAT_LNG, CENTER_2_LAT_LNG, CENTER_3_LAT_LNG]

class GoogleMap extends React.Component {
  constructor() {
    super();
    this.googleMapRef = createRef();
    this.map = undefined;
    this.directionsService = undefined;
    this.directionsRenderer = undefined;
    this.pickupMarker = undefined;
    this.sendtoMarker = undefined;
    this.warehouseMarkers = [];
    this.polyline = undefined;
  }

  componentDidMount() {
    // alert('didMount')
    mapLoader().then(() => {
      this.map = new window.google.maps.Map(this.googleMapRef.current, mapInitOpt);
      this.directionsService = new window.google.maps.DirectionsService();
      this.directionsRenderer_1 = new window.google.maps.DirectionsRenderer();
      this.directionsRenderer_2 = new window.google.maps.DirectionsRenderer()
      this.directionsRenderer_1.setMap(this.map)
      this.directionsRenderer_2.setMap(this.map)
      this.pickupMarker = new window.google.maps.Marker()
      this.sendtoMarker = new window.google.maps.Marker()
      for (var i = 0; i < NUM_OF_WAREHOUSES; i++) {
        this.warehouseMarkers.push(new window.google.maps.Marker({
          icon: {
            ...warehouseMarkerOpt,
            anchor: new window.google.maps.Point(400, 400),
          },
          position: centersLatlng[i],
          map: this.map,
        }))
      }
      this.polyline 
        = new window.google.maps.Polyline({
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 0.4,
          strokeWeight: 8,
        })
    })
    .catch((err) => {
        console.log("Map initiation failed", err.message);
        message.error('Map initiation failed');
    })
  }

  
  componentDidUpdate() {
    // alert('didUpdate')
    this.pickupMarker.setMap(null)
    this.sendtoMarker.setMap(null)
    this.polyline.setMap(null)
    this.setMarker(this.pickupMarker, this.props.pickup)
    this.setMarker(this.sendtoMarker, this.props.sendto)
    const locations = [this.props.pickup, this.props.sendto]
    if (this.props.isCenterSelected) {
      locations.push(this.props.centerlatlng)
      this.drawDirection(this.directionsService, this.directionsRenderer_2, [locations[1], locations[2]])
    }
    if (this.props.showDrone) {
      this.drawLine(this.polyline, locations)
    }
    if (this.props.showRobot) {
      this.drawDirection(this.directionsService, this.directionsRenderer_1, [locations[0], locations[1]])
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