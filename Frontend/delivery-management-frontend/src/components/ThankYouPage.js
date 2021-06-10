import React from 'react';
import checkmark from "../assets/CheckMark.svg";
import { Link } from 'react-router-dom';
import { CheckCircleTwoTone } from '@ant-design/icons';


function ThankYouPage(props) {
    
    const { state } = props.location

    return (
        <div id="thank-you">
            <div className = "card" style={{backgroundColor: 'white'}}>
                <div className="thank-you-title-container">
                    <CheckCircleTwoTone 
                        twoToneColor="#CECECE"
                        style={{fontSize: '56px', marginRight: '30px'}}/>
                    <div className="thank-you-title">
                        <h1>Thank you!</h1>
                        <div>Your order has been placed</div>
                    </div>
                </div>

                <Link 
                    className = "button1"
                    to='/'>Create new shipment</Link>

                <Link 
                    className="button2"
                    to={{
                    pathname: '/trackorder',
                    state: state,
                }}>Track this order</Link>

             </div>
        </div>
    );
}

export default ThankYouPage;