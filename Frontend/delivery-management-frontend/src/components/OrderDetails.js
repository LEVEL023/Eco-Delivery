import React from "react";
import { Tabs, Radio, Space } from 'antd';
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

const { TabPane } = Tabs;

class OrderDetails extends React.Component {
  state = {
    tabPosition: 'left',
  };

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };

  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Space style={{ marginBottom: 24 }}>
          {/* Tab position:
          <Radio.Group value={tabPosition} onChange={this.changeTabPosition}>
            <Radio.Button value="top">top</Radio.Button>
            <Radio.Button value="bottom">bottom</Radio.Button>
            <Radio.Button value="left">left</Radio.Button>
            <Radio.Button value="right">right</Radio.Button>
          </Radio.Group> */}
        </Space>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="In progress" key="1">
            <Card1 />
          </TabPane>
          <TabPane tab="Completed" key="2">
            <Card2 />
          </TabPane>
          <TabPane tab="Cancelled" key="3">
            <Card3 />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

// ReactDOM.render(<Demo />, mountNode);

export default OrderDetails;