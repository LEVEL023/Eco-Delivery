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
        showDraw: false
    }

    handleOriginSelected = (query, latlng) => {
        console.log('originSelected')
        console.log(latlng)
        this.setState({
            pickup: query,
            pickuplatlng: latlng,
        })
    }
    handleDestinationSelected = (query, latlng) => {
        console.log('destinationSelected')
        console.log(latlng)
        this.setState({
            sendto: query,
            sendtolatlng: latlng,
        })
    }

    handleQuoteFormComplete = () => {
        this.setState(prev => {
            return {
                showDraw: true
            }
        })
    }

    render = () => {
        return (
            <div id="ship">
                <section className="map" id="map">
                    <GoogleMap 
                        pickup={this.state.pickuplatlng}
                        sendto={this.state.sendtolatlng}
                        showDraw={this.state.showDraw} />
                </section>
                <aside className="nav" id="nav">
                    <Nav
                        onOriginSelected={this.handleOriginSelected}
                        onDestinationSelected={this.handleDestinationSelected}
                        onQuoteFormComplete={this.handleQuoteFormComplete} />
                </aside>
            </div>
        );
    }
}

export default Ship;