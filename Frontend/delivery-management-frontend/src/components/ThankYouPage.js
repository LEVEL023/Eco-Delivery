import React from 'react';
import checkmark from "../assets/CheckMark.svg";
import { Link } from 'react-router-dom';
import {Button} from "antd";

function ThankYouPage(props) {
    
    const { state } = props.location

    return (
        <div className="main">
            <div className = "card" style={{backgroundColor: 'white'}}>
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
                <Button size = "medium" className = "button1">
                    <Link to='/'>Create new shipment</Link>
                </Button>
                <br/>
                <br/>
                <Button size = "medium" className="button2">
                    <Link to={{
                        pathname: '/trackorder',
                        state: state,
                    }}>Track this order</Link>
                </Button>

             </div>
        </div>
    );
}

export default ThankYouPage;