import React from 'react';
import GoogleMap from './GoogleMap';
import MapContainer from './MapContainer';
import Nav from './Nav';

class Ship extends React.Component {

    // state stores location information
    // data exchange between between autocomplete and map
    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        // showMarker: false,
        // showLine: false,
        // showRoute: false,
        locationSet: []
    }


    handlePlaceSelected = (name, query, latlng) => {
        this.setState(prev => { return {
            [name]: query,
            [name + 'latlng']: latlng,
            locationSet: [...prev.locationSet, latlng]
        }})
    }

    handleAlertLogin = () => {
        console.log('Main: handlealertlogin')
        this.props.alertLogin();
    }




    locations = [
        {
            lat: 37.77493,
            lng: -122.419415,
        },
        {
            lat: 37.7706281,
            lng: -122.3911664
        },
    ]
    render = () => {
        return (
            <div id="ship">
                <section className="map" id="map">
                    {/* <MapContainer
                        // showMarker={this.state.showMarker}
                        // showLine={this.state.showLine}
                        // showRoute={this.state.showRoute}
                        pickupGeo={this.state.pickuplatlng}
                        destinationGeo={this.state.destinationGeo}
                        pickupAddress={this.state.pickup}
                        destinationAddress={this.state.sendto} /> */}
                    <GoogleMap locations={this.state.locationSet}/>
                </section>
                <aside className="nav" id="nav">
                    <Nav
                        onPlaceSelected={this.handlePlaceSelected}
                        alertLogin={this.handleAlertLogin} />
                </aside>
            </div>
        );
    }
}

export default Ship;