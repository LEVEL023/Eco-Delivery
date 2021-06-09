import React from 'react';
import GoogleMap from './GoogleMap';
import Nav from './Nav';
import { getCenters } from '../utils';
import { message } from 'antd';

class Ship extends React.Component {

    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        showDrone: false,
        showRobot: false,
        selectedCenter: '',
        selectedCenterlatlng: undefined,
        selectedCenterID : '',
    }

    // componentDidMount = () => {
    //     getCenters().then((res) => {
    //         if (res.status === 200) {
    //             const centerslatlng = res.data
    //             console.log(centerslatlng)
    //             this.setState({
    //                 centers: centerslatlng
    //             })
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("get dispatch centers failed: ", err.message);
    //         message.error('Get Dispatch centers failed');
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
        console.log(latlng);
        this.setState({
            sendto: query,
            sendtolatlng: latlng,
        })
    }
    handleCenterSelected = (query, centerId, deliveryType) => {
        console.log('centerSelected : ');
        console.log(query, centerId, deliveryType);
        if (deliveryType === 'drone') {
            this.setState(prev => {
                return {
                    selectedCenter : query,
                    selectedCenterID : centerId,
                    showDrone : true,
                    showRobot : false,
                }
            })
        } else if (deliveryType === 'robot') {
            this.setState(prev => {
                return {
                    selectedCenter : query,
                    selectedCenterID : centerId,
                    showDrone : false,
                    showRobot :true,
                }
            })
        } else {
            this.setState(prev => {
                return {
                    selectedCenter : '',
                    selectedCenterID : '',
                    showDrone : true,
                    showRobot : true,
                }
            })
        }
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
                        markerLocations={this.state.centers}
                        selectedCenter={this.state.selectedCenter}
                        selectedCenterID = {this.state.selectedCenterID} />
                </section>
                <aside className="nav" id="nav">
                    <Nav
                        onOriginSelected={this.handleOriginSelected}
                        onDestinationSelected={this.handleDestinationSelected}
                        onQuoteFormComplete={this.handleQuoteFormComplete} 
                        onCenterSelected = {this.handleCenterSelected}/>
                </aside>
            </div>
        );
    }
}

export default Ship;