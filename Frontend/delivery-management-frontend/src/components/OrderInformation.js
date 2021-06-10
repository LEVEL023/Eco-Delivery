import React, { Component } from 'react';
import { Row, Col, Button, message } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import SenderInformation from "./SenderInformation";
import RecipientInformation from "./RecipientInformation";
import Agent from "./Agent";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, TOKEN_KEY } from "../constants";
import { useState } from 'react/cjs/react.development';

function OrderInformation(props) {
    const { response, orderID } = props;
    const myResponse = response;

    const [orderStatus, setOrderStatus] = useState(myResponse.data.status)

    const history = useHistory();

    const onClick = (e) => {
        e.preventDefault();
        console.log("Button Clicked");
        const opt = {
            method: "PUT",
            url: `${BASE_URL}/order/update_order/${orderID}?status=3`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }
        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    setOrderStatus('CANCELED')
                    console.log("Order Cancelled")
                    message.success('Order is canceled')
                }
            })
            .catch(err => {
                console.log("Error is: ", err.message);
            })
    }
    const backButton = (e) => {
        e.preventDefault()
        history.goBack();
    }

    return (
        <>
            <div className="track-grid">
                <div className="track-icon">
                    <button 
                        className="track-back-btn" 
                        onClick={backButton}> <LeftOutlined /> </button>
                    <Agent info={myResponse.data} />
                </div>

                <div className="track-title">
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        Type of Object: {myResponse.data.item.type}
                    </div>
                </div>
                <div className="track-empty-grid"></div>

                <div className="track-order-info">
                    Created on: {myResponse.data.orderedTime}
                    <br />
                    Weight of Object: {myResponse.data.item.weight}
                    <br />
                    Amount Paid: {myResponse.data.cost ? myResponse.data.cost : 0}
                </div>

                <div className="track-sender-title">Sender Information:</div>

                <div className="track-sender-info">
                    <SenderInformation info={myResponse.data.sender} />
                </div>

                <div className="track-receiver-title">Receiver Information:</div>

                <div className="track-receiver-info">
                    <RecipientInformation info={myResponse.data.recipient} />
                </div>


            </div>
            {
                orderStatus === 'PLACED' &&
                <div className="cancel">
                    <Button className="cancel-btn" onClick={onClick}>Cancel Order</Button>
                </div>
            }
        </>
    );

}

export default OrderInformation;