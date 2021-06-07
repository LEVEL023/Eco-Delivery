import React from 'react';
import GoogleMap from './GoogleMap';
import Nav from './Nav';
import { getCenters } from '../utils';

class Ship extends React.Component {

    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        showDrone: false,
        showRobot: false,
    }

    // componentDidMount = () => {
    //     getCenters().then((res) => {
    //         const centerslatlng = [...res]
    //         this.setState({
    //             centers: centerslatlng
    //         })
    //     })
    //     .catch((err) => {
    //         console.log("submit order failed: ", err.message)
    //     })
    // }

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
                        showRobot={this.state.showRobot}
                        markerLocations={this.state.centers} />
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