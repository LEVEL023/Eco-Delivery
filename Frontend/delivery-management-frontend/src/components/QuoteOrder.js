import React from 'react';
import Autocomplete from './Autocomplete';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '../constants'


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

    quoteOrLogin = () => {
        if (localStorage.getItem(TOKEN_KEY)){
            return (
                <input className="get-started-btn" type="submit" value="Get started"></input>
            )
        } else {
            return (
                <div className="get-started-btn-link-container">
                <Link className="get-started-btn-link" to="/login">Get started</Link>
                </div>
            )
        }
    }

    render = () => {
        return (
            <div>
                <h1 className="quote-order-title">Quote a shipment</h1>
                <form className="quote-order-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="quote-order-addr">
                        <Autocomplete className="pick-up-addr" placeholder="pick up address" name="pickup" onPlaceSelected={this.handlePlaceSelected} />
                        <Autocomplete className="send-to-addr" placeholder="send to address" name="sendto" onPlaceSelected={this.handlePlaceSelected} />
                        {/* when both addresses are filled, show drawing on map */}
                    </div>

                    <input className="description"
                        style={{ width: '100%' }}
                        required={true}
                        name="description"
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder='description: e.g. "foods", "clothes", etc'
                        onChange={this.handleChange.bind(this)}
                    />
                    <input className="weight"
                        style={{ width: '80px' }}
                        required={true}
                        name="weight"
                        type="number"
                        min={1} max={36}
                        placeholder="weight"
                        onChange={this.handleChange.bind(this)}
                    />
                    <span style={{ marginRight: '25px' }}>  lbs</span>
                    <input type="checkbox"
                        name="fragile"
                        onChange={this.handleChange.bind(this)}
                    />
                    <span>  fragile</span>

                    {this.quoteOrLogin()}
                </form>
            </div>
        )
    }
}

export default QuoteOrder;