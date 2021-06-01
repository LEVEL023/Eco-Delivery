import React, { createRef } from 'react'
import { mapLoader } from '../utils';

class GoogleMap extends React.Component {
  googleMapRef = createRef();

  map;
  opt = {
    zoom: 12,
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
      this.createMarker()
    })
  }

  createGoogleMap = (ref, opt) => {
    return (
      new window.google.maps.Map(ref, opt)
    )
  }

  createMarker = () =>
    new window.google.maps.Marker({
      position: {
        lat: 37.77493,
        lng: -122.419415,
      },
      map: this.map,
    })

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