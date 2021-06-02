import React, { createRef } from 'react'
import { mapLoader } from '../utils';

class GoogleMap extends React.Component {
  googleMapRef = createRef();

  map;
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
      this.map = this.createGoogleMap(this.googleMapRef.current, this.opt)
      this.props.locations.forEach(this.createMarker)
      this.createLine(this.props.locations)
    })
  }

  componentDidUpdate() {
    this.props.locations.forEach(this.createMarker)
    this.createLine(this.props.locations)
  }

  createGoogleMap = (ref, opt) => {
    return (
      new window.google.maps.Map(ref, opt)
    )
  }

  // latlng
  // {
  //   lat: ...,
  //   lng: ...
  // }
  createMarker = (latlng) => {
    console.log(latlng)
    new window.google.maps.Marker({
      position: latlng,
      map: this.map,
    })
  }

  createLine = (locations) => {
    console.log('create line')
    new window.google.maps.Polyline({
      map: this.map,
      path: locations,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 8,
    })
  }

  createDirection = () => {

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