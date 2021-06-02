import React from "react";
import { Card, Avatar} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';


const OrderCard = (props) => {


        return (
            <Card  className="Card3-1" actions={[
                <EllipsisOutlined key="ellipsis" />,
              ]} >
                <Card.Meta avatar={<Avatar style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                        title= {"Order ID: " + props.orderData.order_id}
                        description= {"From " + props.orderData.sender.address + "To " + props.orderData.recipient.address}>
                </Card.Meta>
            </Card>
        )
}

export default OrderCard;