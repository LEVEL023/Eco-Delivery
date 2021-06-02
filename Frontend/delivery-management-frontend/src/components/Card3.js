import React from "react";
import { Card } from 'antd';

const Card3 = () => (
    <Card style={{ }} className="Card3-1">
        <Card.Meta avatar={<img alt="" 
                style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                title="Order #123456789"
                description="Order cancelled on Mon, May 4 2021 at 09:19">
        </Card.Meta>
    </Card>
)

export default Card3;