import React from "react";
import { Card, Avatar, Divider} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const OrderCard = (props) => {
      const directToTrackOrderPage = () => {

      }

        return (
          <div>
            <Card   onClick = {directToTrackOrderPage} className="Card3-1" >
                <Card.Meta avatar={<Avatar style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                        title= {"Order ID: " + props.orderData.orderNumber}
                        description= {"From " + props.orderData.sender.address + "To " + props.orderData.recipient.address}>
                </Card.Meta>
                <Link to={{
                    pathname: '/trackorder',
                    state: { orderid : props.orderData.orderNumber },
                }}><EllipsisOutlined key="ellipsis" /></Link>
            </Card>
          </div>
            
        )
}

export default OrderCard;