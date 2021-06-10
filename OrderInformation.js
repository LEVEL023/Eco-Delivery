import React, {Component} from 'react';
import {Row, Col, Button, message} from "antd";
import {LeftOutlined} from '@ant-design/icons';
import SenderInformation from "./SenderInformation";
import RecipientInformation from "./RecipientInformation";
import Agent from "./Agent";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {BASE_URL, TOKEN} from "../constants";

function OrderInformation(props) {
    const {response, orderID} = props;
    const myResponse = response;
    const history = useHistory();
    const onClick = (e) => {
        e.preventDefault();
        console.log("Button Clicked");
        const opt = {
            method: "PUT",
            url: `${BASE_URL}/order/update_order/${orderID}?status=3`,
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }
        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    console.log("Order Cancelled")
                    message.success();
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
            <div className="order-information">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="back-btn">
                    <button onClick={backButton}> <LeftOutlined /> </button>
                </div>

                        <Row justify="center" className="second-row">
                            <Col span={8}>
                                <Agent info={myResponse.data}/>
                            </Col>
                            <Col span={16}>
                                Type of Object: {myResponse.data.item.type}
                            </Col>
                        </Row>

                        <Row justify="center" className="description">
                            Created on: {myResponse.data.orderedTime}
                            <br/>
                            Weight of Object: {myResponse.data.item.weight}
                            <br/>
                            Amount Paid: {myResponse.data.cost ? myResponse.data.cost : 0}
                        </Row>

                <br />
                <br />
                <br />
                <br />

                        <Row justify="center">
                            <Col span={6}> Sender Information: </Col>
                            <Col span={18}>
                                <SenderInformation info={myResponse.data.sender}/>
                            </Col>
                        </Row>

                        <Row justify="center">
                            <Col span={6}> Recipient Information: </Col>
                            <Col span={18}>
                                <RecipientInformation info={myResponse.data.recipient}/>
                            </Col>
                        </Row>

                <br/>
                <br/>
                <div className="cancel"><Button className="cancel-btn" onClick={onClick}>Cancel Order</Button></div>
            </div>
        );

}

export default OrderInformation;