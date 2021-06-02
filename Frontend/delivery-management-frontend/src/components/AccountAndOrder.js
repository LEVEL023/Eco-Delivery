import React from "react";
import { Tabs } from 'antd';
import AccountDetails from "./AccountDetails";
import OrderDetails from "./OrderDetails";
// import axios from "axios";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const AccountAndOrder = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Account Info" key="1">
        <AccountDetails />
    </TabPane>
    <TabPane tab="Order History" key="2">
        <OrderDetails />
    </TabPane>
  </Tabs>
);


export default AccountAndOrder;
