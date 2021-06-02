import React from "react";
import { Card } from 'antd';
import { Table, Tag, Space } from 'antd';

let maxInOnePage = 4;

function table1() {
    const dataSource = [
        Card1_1(),
        Card1_2(),
        Card1_3(),
        Card1_4(),
        Card1_5(),
        // Card1_6(),
        
    ]

    const columns = [
        {}
    ]

    return <
        Table dataSource={dataSource} 
        columns={columns} 
        />;
}
    
const Card1_1 = () => (<div className="container_card1-1">
        <Card style={{ }} className="Card1-1">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

const Card1_2 = () => (<div className="container_card1-2">
        <Card style={{ }} className="Card1-2">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

const Card1_3 = () => (<div className="container_card1-3">
        <Card style={{ }} className="Card1-3">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

const Card1_4 = () => (<div className="container_card1-4">
        <Card style={{ }} className="Card1-4">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

const Card1_5 = () => (<div className="container_card1-5">
        <Card style={{ }} className="Card1-5">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

const Card1_6 = () => (<div className="container_card1-6">
        <Card style={{ }} className="Card1-6">
            <Card.Meta avatar={<img alt="" 
                    style={{ width: '64px', height: '64px', borderRadius: '32px' }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
                    title="Sending Shoes to Tom"
                    description="Will be delivered on Mon, May 4 2021 at 19:05">
            </Card.Meta>
        </Card>
    </div>
)

export default table1;
