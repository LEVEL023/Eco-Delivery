import React, {Component} from 'react';
import Drone from '../assets/drone.png';
import Robot from '../assets/robot.png';

class Agent extends Component {
    render() {
        const {info} = this.props;
        const {agentType} = info;
        return (
            <div>
                {
                    agentType === "DRONE" ?
                        <img src={Drone} width={100} height={100}/>
                        :
                        <img src={Robot} width={100} height={100}/>
                }
            </div>
        );
    }
}

export default Agent;