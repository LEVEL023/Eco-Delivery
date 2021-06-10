import React from 'react';
import MethodCard from './MethodCard';

class Recommendation extends React.Component {

    state = {
        method: ''
    }

    handleBackClicked = () => {
        this.setState({
            method: ''
        })
        this.props.onBack();
    }

    handleSelect = (e) => {
        this.setState({
            method: e.target.value
        })
        console.log(e.target.value);
        if (this.state.method === 'drone') {
            this.props.onCenterSelected(this.props.drone.centerLocation, this.props.drone.centerId, this.state.method);
        } else if (this.state.method === 'robot') {
            this.props.onCenterSelected(this.props.robot.centerLocation, this.props.robot.centerId, this.state.method);
        } else {
            this.props.onCenterSelected(this.props.robot.centerLocation, this.props.robot.centerId, 'both');
        }
    }

    onContinue = () => {
        this.props.onContinue(this.state.method)
    }

    render = () => {
        return (
            <div>
                <h1 className="recommendation-title" style={{ marginBottom: '47px' }}>Choose a shipping method</h1>
                <div className="recommendation-card">
                    <MethodCard 
                        type="robot" 
                        selected={this.state.method === 'robot'} 
                        details={this.props.robot} 
                        onSelect={this.handleSelect}/>
                    <MethodCard 
                        type="drone" 
                        selected={this.state.method === 'drone'} 
                        details={this.props.drone} 
                        onSelect={this.handleSelect}/>
                </div>
                <div>
                    <button className="recommendation-continue-btn" onClick={this.onContinue}>Continue</button>
                    <button className="recommendation-back-btn" onClick={this.handleBackClicked}>Back</button>
                </div>
            </div>
        )
    }
}

export default Recommendation;