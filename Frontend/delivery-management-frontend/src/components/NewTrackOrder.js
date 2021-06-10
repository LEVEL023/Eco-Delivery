import { Col, Row } from "antd";
import React from 'react';
import OrderInformation from "./OrderInformation";
import NewGoogleMap from "./NewGoogleMap";
import { BASE_URL, TOKEN_KEY } from "../constants";
import axios from "axios";

// const orderID = "79035b9f-0bdb-4e32-be89-1779b5fcca4b"; 

class NewTrackOrder extends React.Component {



    constructor() {
        super();
        this.orderID = undefined;
        this.state = {
            stateResponse: null,
        }
    }


    componentDidMount() {
        const { state } = this.props.location
        this.orderID = state.orderid
        // console.log('props location -> ')
        // console.log(this.props.location)
        const opt = {
            method: "GET",
            url: `${BASE_URL}/order/get_order_detail/${this.orderID}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }
        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    console.log("Got Response")
                }
                this.setState({ stateResponse: response });
                console.log("The response is: ", response);
            })
            .catch(err => {
                console.log("Error is: ", err.message);
            })
    }
    render() {
        return (
            <div id="track">
                {
                    this.state.stateResponse ?
                        <>
                            <div className='track-map'>
                                <NewGoogleMap
                                    style={{ zIndex: '99' }}
                                    pickup={{ lat: this.state.stateResponse.data.depLat, lng: this.state.stateResponse.data.depLng }}
                                    sendto={{ lat: this.state.stateResponse.data.desLat, lng: this.state.stateResponse.data.desLng }}
                                    showDrone={this.state.stateResponse.data.agentType === "DRONE"} />
                            </div>
                            <div className='track-nav'>
                                <OrderInformation response={this.state.stateResponse} orderID={this.props.location.state.orderid} />
                            </div>
                        </>
                        :
                        null
                }
            </div>
        );
    }
}

export default NewTrackOrder;