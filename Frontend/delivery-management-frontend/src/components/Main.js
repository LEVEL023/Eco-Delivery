import React from 'react';
import GoogleMap from './GoogleMap';
import MapContainer from './MapContainer';
import Nav from './Nav';

class Main extends React.Component {

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
    }

    handlePlaceSelected = (name, query, latlng) => {
        this.setState({
            [name]: query,
            [name + 'latlng']: latlng,
        })
    }

    handleAlertLogin = () => {
        console.log('Main: handlealertlogin')
        this.props.alertLogin();
    }





    render = () => {
        return (
            <>
                <section className="map" id="map">
                    {/* <MapContainer
                        // showMarker={this.state.showMarker}
                        // showLine={this.state.showLine}
                        // showRoute={this.state.showRoute}
                        pickupGeo={this.state.pickuplatlng}
                        destinationGeo={this.state.destinationGeo}
                        pickupAddress={this.state.pickup}
                        destinationAddress={this.state.sendto} /> */}
                    <GoogleMap />
                </section>
                <aside className="nav" id="nav">
                    <Nav
                        onPlaceSelected={this.handlePlaceSelected}
                        alertLogin={this.handleAlertLogin} />
                </aside>
            </>
        );
    }
}

export default Main;