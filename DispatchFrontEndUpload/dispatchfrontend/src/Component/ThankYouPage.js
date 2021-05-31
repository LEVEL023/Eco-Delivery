import React from 'react';
import {Layout} from 'antd';
import "../Style/ThankYouPage.css";
import Main from "./Main";
import TopBar from "./TopBar";
import Footer from "./Footer";

const { Header} = Layout;
// class App extends React.Component {
//   render = () => (
//       <Layout>
//         <Header>
//           {'Header'}
//         </Header>
//         <Layout>
//           <Layout style={{ padding: '24px' }}>
//
//
//                 <Card  className = "card_style">
//                     <CheckCircleOutlined style={{ fontSize: '500%'}} ></CheckCircleOutlined>
//                     <h1 style={{ color: '#000000', fontSize: '28px'}}>
//                         Thank You !
//                         <br/>
//                         Your order has been placed.
//                     </h1>
//                     <Button size="medium" style = {{height: '45px', width: '230px'}}>
//                         <p style={{fontSize: '20px'}}>Create new shipment</p>
//                     </Button>
//                     <br/>
//                     <br/>
//                     <Button size = 'medium' style = {{height: '45px', width: '230px', fontsize: '32px'}}>
//                         <p style={{fontSize: '20px'}}>Track this order</p>
//                     </Button>
//
//                 </Card>
//
//           </Layout>
//         </Layout>
//       </Layout>
//   )
// }

function ThankYouPage(props) {
    return (
        <div className="backGround">
            <TopBar/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default ThankYouPage;

