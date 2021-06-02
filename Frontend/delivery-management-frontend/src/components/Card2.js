import React from "react";
import { Card } from 'antd';

// const style={
//     width:'500px',
//     margin:'20px',
//     boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',
//     border:'1px solid #e8e8e8',
// };

const Card2 = () => (
    <Card style={{ }} className="Card2-1">
        <Card.Meta avatar={<img alt="" 
                style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                title="Sent Electronics to Tom"
                description="Order delivered on Mon, May 4 2021 at 18:45">
        </Card.Meta>
    </Card>
)

export default Card2;