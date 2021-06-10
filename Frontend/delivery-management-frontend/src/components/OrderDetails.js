import React from "react";
import { Tabs, Radio, Space } from 'antd';
import OrderCard from "./OrderCard";
import {orderHistoryData} from '../mockOrderHistoryData.js';
import { getAllOrder } from '../utils';
import { ID_KEY } from '../constants';

const { TabPane } = Tabs;

class OrderDetails extends React.Component {
  state = {
    tabPosition: 'left',
    hasData: false,
    placed : [],
    pickedUp :[],
    completed : [],
    canceled : []
  };

  componentDidMount() {
    console.log(localStorage.getItem(ID_KEY))
    getAllOrder(localStorage.getItem(ID_KEY))
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          this.setState({
            placed: data.PLACED,
            pickedUp: data.PICKED,
            completed: data.COMPLETED,
            canceled: data.CANCELED,
            hasData: true,
          })
        }
      })
      .catch((err) => {
        console.log("get All orders by userId failed: ", err.message)
      })
    // const data = orderHistoryData.data;
    // this.setState({
    //   Placed : data.Placed,
    //   PickedUp : data.PickedUp,
    //   completed : data.completed,
    //   Canceled : data.Canceled
    // })
  }

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };
  renderOrderCard = (obj) => {
    return <OrderCard key = {obj.orderNumber} orderData = {obj} />
  }

  render() {
    const { tabPosition, hasData } = this.state;
    return (
      <>
        {  hasData &&
          <>
              <Space style={{ marginBottom: 24 }} />
              <Tabs tabPosition={tabPosition}>
                <TabPane tab="In progress" key="1">
                  {this.state.placed && this.state.placed.map(obj => this.renderOrderCard(obj))}
                  {this.state.pickedUp && this.state.pickedUp.map(obj => this.renderOrderCard(obj))}
                </TabPane>
                <TabPane tab="Completed" key="2">
                {this.state.completed && this.state.completed.map(obj => this.renderOrderCard(obj))}
                </TabPane>
                <TabPane tab="Cancelled" key="3">
                {this.state.canceled && this.state.canceled.map(obj => this.renderOrderCard(obj))}
                </TabPane>
              </Tabs>
          </>
        }
      </>
    )
  }
}


export default OrderDetails;