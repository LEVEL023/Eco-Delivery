import React, { Component, createRef } from 'react';
import { mapLoader } from '../utils';

class Autocomplete extends Component {
    state = {
        query: "",
        latlng: undefined
    }
    autocompleteRef = createRef();
    autocomplete;


    componentDidMount = () => {
        let opt = {
            // bounds: {
            //     east: -123,
            //     north: 36,
            //     south: 38,
            //     west: -121,
            // },
            componentRestrictions: { country: "us" },
            strictBounds: false,
        }
        mapLoader().then(() => {
            this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteRef.current, opt);
            this.autocomplete.setFields(["address_components", "formatted_address", "geometry"])
            this.autocomplete.addListener("place_changed", this.onPlaceSelected)
        })
    }

    onPlaceSelected = () => {
        const addressObject = this.autocomplete.getPlace()
        const query = addressObject.formatted_address;
        const latlng = {
            lat: addressObject.geometry.location.lat(),
            lng: addressObject.geometry.location.lng()
        }
        this.setState({
            query: query,
            latlng: latlng
        })
        this.props.onPlaceSelected(query, latlng)
        console.log(addressObject)
    }

    render = () => {
        return (
            <div className="address-input">
                <input 
                    style={{width: '100%'}}
                    required={true}
                    ref={this.autocompleteRef}
                    onChange={e => this.setState({ query: e.target.value })}
                    placeholder={this.props.placeholder}
                    value={this.state.query}
                />
            </div>
        )
    }
}

export default Autocomplete;