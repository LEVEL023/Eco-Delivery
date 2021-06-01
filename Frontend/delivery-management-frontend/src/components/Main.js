import React from 'react';
import GoogleMap from './GoogleMap';
import Nav from './Nav';
import {TOKEN_KEY} from '../constants';

class Main extends React.Component {
    
    // state stores location information
    // data exchange between between autocomplete and map
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
    }

    handlePlaceSelected = (name, query, latlng) => {
        this.setState({
            [name]: query,
            [name + 'latlng']: latlng,
        })
    }
    
    handleQuoteSubmit = (formData) => {
        if (!this.state.isLoggedIn) {
            // 
        }
    }

    handleAlertLogin = () => {
        console.log('Main: handlealertlogin')
        this.props.alertLogin();
    }

    

    render = () => {
        return (
            <>
                <section className="map" id="map">
                    <GoogleMap/>
                </section>
                <aside className="nav" id="nav">
                    <Nav onPlaceSelected={this.handlePlaceSelected}
                         onQuoteSumbit={this.handleQuoteSubmit}
                         alertLogin={this.handleAlertLogin}/>
                </aside>
            </>
        );
    }
}

export default Main;