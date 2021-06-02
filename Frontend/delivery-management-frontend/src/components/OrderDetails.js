import React from "react";
import { Tabs, Radio, Space } from 'antd';
import OrderCard from "./OrderCard";
import {orderHistoryData} from '../mockOrderHistoryData.js';

const { TabPane } = Tabs;

class OrderDetails extends React.Component {
  state = {
    tabPosition: 'left',
    Placed : [],
    PickedUp :[],
    completed : [],
    Canceled : []
  };

  componentDidMount() {
    const data = orderHistoryData.data;
    this.setState({
      Placed : data.Placed,
      PickedUp : data.PickedUp,
      completed : data.completed,
      Canceled : data.Canceled
    })
  }

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };
  renderOrderCard = (obj) => {
    return <OrderCard key = {obj.order_id} orderData = {obj} />
  }

  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Space style={{ marginBottom: 24 }}>
        </Space>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="In progress" key="1">
            {this.state.Placed.map(obj => this.renderOrderCard(obj))}
            {this.state.PickedUp.map(obj => this.renderOrderCard(obj))}
          </TabPane>
          <TabPane tab="Completed" key="2">
          {this.state.completed.map(obj => this.renderOrderCard(obj))}
          </TabPane>
          <TabPane tab="Cancelled" key="3">
          {this.state.Canceled.map(obj => this.renderOrderCard(obj))}
          </TabPane>
        </Tabs>
      </>
    );
  }
}


export default OrderDetails;