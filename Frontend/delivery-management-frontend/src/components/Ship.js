import React from 'react';
import GoogleMap from './GoogleMap';
import Nav from './Nav';

class Ship extends React.Component {

    // state stores location information
    // data exchange between between autocomplete and map
    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        showDrone: false,
        showRobot: false,
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
                showDrone: true,
                showRobot: true,
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
                        showDrone={this.state.showDrone}
                        showRobot={this.state.showRobot} />
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