import React from 'react';
import GoogleMap from './GoogleMap';
import Nav from './Nav';
import { message } from 'antd';

class Ship extends React.Component {

    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        showDrone: false,
        showRobot: false,
        isCenterSelected: false,
        selectedCenterlatlng: undefined,
        selectedDroneId: '',
        selectedRobotId: '',
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
                    showDrone : true,
                    showRobot : false,
                    selectedDroneId : prev.selectedDroneId,
                    selectedRobotId : prev.selectedRobotId,
                }
            })
        } else if (deliveryType === 'robot') {
            this.setState(prev => {
                return {
                    selectedCenter : query,
                    showDrone : false,
                    showRobot :true,
                    selectedDroneId : prev.selectedDroneId,
                    selectedRobotId : prev.selectedRobotId,
                }
            })
        } else {
            this.setState(prev => {
                return {
                    selectedCenter : '',
                    selectedCenterID : '',
                    showDrone : true,
                    showRobot : true,
                    selectedDroneId : prev.selectedDroneId,
                    selectedRobotId : prev.selectedRobotId,
                }
            })
        }
    }

    handleQuoteFormComplete = (droneId, robotId) => {
        this.setState(prev => {
            return {
                selectedDroneId: droneId,
                selectedRobotId: robotId,
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
                        isCenterSelected={this.state.isCenterSelected}
                        selectedDroneId = {this.state.selectedDroneId}
                        selectedRobotId = {this.state.selectedRobotId} />
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