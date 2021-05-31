import React from 'react';
import {Card, Button} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import checkmark from "../Assets/image/CheckMark.svg";

function Main(props) {
    return (
        <div className="main">
            <Card className = "card">
                {/*<CheckCircleOutlined className="logo" style={{ fontSize: '400%'}} ></CheckCircleOutlined>*/}
                <img src={checkmark} className="checkmark" alt="logo" />
                <text className="text">
                    Thank You !
                </text>
                <br/>
                <text className="text1">
                    Your order has been placed.
                </text>
                <br/>
                <br/>
                 <Button size="medium" className="button1">
                     <p style={{fontSize: '20px'}}>Create new shipment</p>
                 </Button>
                 <br/>
                 <br/>
                <Button size = 'medium' className="button2">
                     <p style={{fontSize: '20px'}}>Track this order</p>
                </Button>
             </Card>
        </div>
    );
}

export default Main;