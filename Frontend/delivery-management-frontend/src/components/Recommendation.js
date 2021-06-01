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
        // console.log(e.target)
        // alert(e.target.value)
        this.setState({
            method: e.target.value
        })
    }

    render = () => {
        return (
            <div>
                <h1 className="recommendation-title" style={{ marginBottom: '47px' }}>Choose a shipping method</h1>
                <div className="recommendation-card">
                    <MethodCard type="robot" selected={this.state.method === 'robot'} details={this.props.robot} onSelect={this.handleSelect}/>
                    <MethodCard type="drone" selected={this.state.method === 'drone'} details={this.props.drone} onSelect={this.handleSelect}/>
                </div>
                <div>
                    <button className="recommendation-continue-btn" onClick = {this.props.onContinue}>Continue</button>
                    <button className="recommendation-back-btn" onClick={this.handleBackClicked}>Back</button>
                </div>
            </div>
        )
    }
}

export default Recommendation;