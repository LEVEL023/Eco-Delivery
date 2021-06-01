import React from 'react';
import Autocomplete from './Autocomplete';


class QuoteOrder extends React.Component {

    // state controls form input fields
    state = {
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        description: '',
        weight: '',
        fragile: false,
    }

    // 打包 state data -> Nav -> axios 'GET' request
    // QuoteOrder: setstate储存quote form信息，然后往上传 ->
    // Nav: 看登没登入，如果有，后端GET request，switch到recommendation，
    //                如果没有往上传登入callback到Main
    // Main: 传登入callback到App
    // App: 传displayModal props到header
    // Header: 传displayModal props到Login
    // Login: rerender 打开modal 
    handleSubmit = (e) => {
        const formData = {
            ...this.state
        }
        e.preventDefault()

        console.log('QuoteOrder: formData->')
        console.log(formData)
        
        this.props.onSubmit(formData)
    }

    // handle weight, fragile input change
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }

    // handle google autocomplete change
    handlePlaceSelected = (name, query, latlng) => {
        this.setState({
            [name]: query,
            [name + 'latlng']: latlng,
        })
        // change should be reflected on map, so send data to Main
        this.props.onPlaceSelected(name, query, latlng)
    }

    render = () => {
        return (
            <div>
                <h1 className="quote-order-title">Quote a shipment</h1>
                <form className="quote-order-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="quote-order-addr">
                        <Autocomplete className="pick-up-addr" placeholder="pick up address" name="pickup" onPlaceSelected={this.handlePlaceSelected}/>
                        <Autocomplete className="send-to-addr" placeholder="send to address" name="sendto" onPlaceSelected={this.handlePlaceSelected}/>
                        {/* when both addresses are filled, show drawing on map */}
                    </div>
                    
                        <input className="description"
                               style={{width: '100%'}}
                               required={true}
                               name="description"
                               value={this.state.description}
                               onChange={e => this.setState({ description: e.target.value })}
                               type="text"
                               placeholder='description: e.g. "foods", "clothes", etc'
                               onChange={this.handleChange.bind(this)}
                        />
                        <input className="weight"
                               style={{width: '80px'}} 
                               required={true}
                               name="weight"
                               type="number" 
                               min={1} max={36} 
                               placeholder="weight" 
                               onChange={this.handleChange.bind(this)}
                        />
                        <span style={{marginRight: '25px'}}>  lbs</span>
                        <input type="checkbox"
                               name="fragile"
                               onChange={this.handleChange.bind(this)}
                        />
                        <span>  fragile</span>
                    
                    <div className="get-started-btn">
                        <input type="submit" value="Get started"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default QuoteOrder;