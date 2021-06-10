import {Col, Row} from "antd";
import React, {Component} from 'react';
import OrderInformation from "./OrderInformation";
import NewGoogleMap from "./NewGoogleMap";
import {BASE_URL, TOKEN, TOKEN_KEY} from "../constants";
import axios from "axios";

const orderID = "79035b9f-0bdb-4e32-be89-1779b5fcca4b"; // should obtain from localStorage

class NewTrackOrder extends Component {
    state = {
        stateResponse: null,
    }
    componentDidMount() {
        const opt = {
            method: "GET",
            url: `${BASE_URL}/order/get_order_detail/${orderID}`,
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }
        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    console.log("Got Response")
                }
                this.setState({stateResponse: response});
                console.log("The response is: ", response);
            })
            .catch(err => {
                console.log("Error is: ", err.message);
            })
    }
    render() {
        return (
            <div>
            {
                this.state.stateResponse ?
                    <Row className="main">
                        <Col span={16} className="map">
                            <NewGoogleMap
                                style={{zIndex: '99'}}
                                pickup={{lat: this.state.stateResponse.data.depLat, lng: this.state.stateResponse.data.depLng}}
                                sendto={{lat: this.state.stateResponse.data.desLat, lng: this.state.stateResponse.data.desLng}}
                                showDrone={this.state.stateResponse.data.agentType === "DRONE"} />
                        </Col>
                        <Col span={8} className="order">
                            <div className="container">
                                <OrderInformation response={this.state.stateResponse} orderID={orderID}/>
                            </div>
                        </Col>
                    </Row>
                    :
                    null
            }
            </div>
        );
    }
}

export default NewTrackOrder;