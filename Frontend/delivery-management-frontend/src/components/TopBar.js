import React from "react";
import logo from "../assets/images/flagcamplogo.svg";

import { LogoutOutlined } from "@ant-design/icons";

function TopBar(props) {
  const { isLoggedIn, handleLogout } = props;
  return (
    <header className="header" id="header">
      <a className="logo-container" id="logo-container" href="/home">
        <img src={logo} className="logo-img" alt="logo" />
        {/* <span className="App-title">ECODelivery</span> */}
        <div className="logo-text">
            <div id="name-bold">ECO</div>
            <div id="name-medium">Delivery</div>
        </div>
      </a>
      {isLoggedIn ? (
        <LogoutOutlined className="logout" onClick={handleLogout} />
      ) : null}
    </header>
  );
}

export default TopBar;
