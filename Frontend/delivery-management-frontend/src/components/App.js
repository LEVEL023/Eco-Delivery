import React from 'react';
import Header from './Header';
import Main from './Main';

class App extends React.Component {
  state = {
    showLoginModal: false,
  }

  handleAlertLogin = () => {
    console.log('App: alertlogin, setState => showLoginModal: true')
    this.setState({
      showLoginModal: true,
    })
  }

  closeAlert = () => {
    this.setState({
      showLoginModal: false,
    })
  }
  render() {
    return (
      <div className="main">
        <Header showLoginModal={this.state.showLoginModal} 
                closeAlert={this.closeAlert} />
        <Main alertLogin={this.handleAlertLogin} />
      </div>
    );
  }
}

export default App;
