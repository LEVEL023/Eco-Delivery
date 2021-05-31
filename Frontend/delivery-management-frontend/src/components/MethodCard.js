import React from 'react';

class MethodCard extends React.Component {

    

    iconSwitch = (type) => {
        switch (type) {
            case 'robot':
                return '\u{1f916}'
            case 'drone':
                return '\u{2708}\u{fe0f}'
        }
    }

    selectedStyle = {
        backgroundColor: '#38966D',
        color: 'white',
        border: 'solid 1px #38966D',
    }

    render = () => {
        return (
            <div>
                <button style={this.props.selected ? {...this.selectedStyle} : null}
                        className="method-card" 
                        onClick={this.props.onSelect}
                        value={this.props.type}
                        readOnly={true}>
                    <div style={{fontSize: '17px'}}>by {this.props.type}</div>
                    <div style={{fontSize: '26px'}}>{this.iconSwitch(this.props.type)}</div>
                    <input type="radio" 
                           checked={this.props.selected} 
                           readOnly={true}/>
                    <div style={{fontSize: '17px', margin: '4px 0px'}}>${this.props.details.fee}</div>
                    <div style={{fontSize: '11px'}}>delivered by {this.props.details.estDate}</div>
                    <div style={{fontSize: '11px'}}>{this.props.details.estTime}</div>
                </button>
            </div>
        )
    }
}

export default MethodCard;