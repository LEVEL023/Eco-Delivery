import React from "react";
import ReactDOM from 'react-dom'
import { Tabs } from 'antd';
import AccountDetails from "./AccountDetails";
import OrderDetails from "./OrderDetails";
// import axios from "axios";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const TopInfo = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Account Info" key="1">
        <AccountDetails />
    </TabPane>
    <TabPane tab="Order History" key="2">
        <OrderDetails />
    </TabPane>
  </Tabs>
);

// ReactDOM.render(<TopInfo />, mountNode);

export default TopInfo;
