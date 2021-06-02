import React from 'react';
import {Layout} from 'antd';
import "../styles/ThankYouPage.css";
import ThankYouPageMain from "./ThankYouPageMain";
import TopBar from "./Header";
import Footer from "./Footer";

const { Header} = Layout;
function ThankyouCard(props) {
    return (
        <div className="backGround">

            <ThankYouPageMain/>
            <Footer/>
        </div>
    );
}

export default ThankyouCard;