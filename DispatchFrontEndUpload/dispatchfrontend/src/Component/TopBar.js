import React from "react";
import { Menu, Dropdown } from 'antd';

import logo from '../Assets/image/flagcamplogo.svg'


function TopBar(props) {
    const menu = (
        <Menu >
            <Menu.Item key="0">
                <a>Account</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a>Order history</a>
            </Menu.Item>
            <Menu.Item key="3">Sign out</Menu.Item>
        </Menu>
    );


    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title"><strong>ECO</strong>Delivery</span>
            <Dropdown overlay={menu} trigger={['click']} className="menu">
                <a  className="AccountName" onClick={e => e.preventDefault()}>
                    Jane
                </a>
            </Dropdown>

        </header>
    );
}

export default TopBar;
