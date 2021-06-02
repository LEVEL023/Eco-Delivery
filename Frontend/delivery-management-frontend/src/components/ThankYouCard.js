import React from 'react';

import "../styles/ThankYouPage.css";
import ThankYouPageMain from "./ThankYouPageMain";
import Footer from "./Footer";


function ThankYouPage(props) {
    return (
        <div className="backGround">

            <ThankYouPageMain/>
            <Footer/>
        </div>
    );
}

export default ThankYouPage;