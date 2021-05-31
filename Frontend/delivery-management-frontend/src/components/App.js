import '../styles/App.css';
import { Layout } from 'antd';
import MapDemo from './MapDemo';

const { Header, Footer, Content } = Layout;
 

function App() {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <MapDemo />
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
