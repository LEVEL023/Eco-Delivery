import React from 'react';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.svg';
import UserMenu from './UserMenu';
import { TOKEN_KEY } from '../constants';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
            userFirstname: '',
            alertLoginModal: false,
            alertRegisterModal: false,
        }
    }

    handleLoginSuccess = (responseData) => {
        const {token, firstname} = responseData;
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            this.setState({
                isLoggedIn: true,
                userFirstname: firstname,
                showLoginModal: false,
                showRegisterModal: false,
            })
            this.props.closeAlert()
        }
    }

    handleLoginFailed = () => {
        this.setState({
            isLoggedIn: false,
            showLoginModal: false,
            showRegisterModal: false,
        })
    }

    handleRegisterSuccess = (responseData) => {

    }

    handleCloseAlert = () => {
        this.setState({
            alertLoginModal: false,
            alertRegisterModal: false,
        })
        this.props.closeAlert();
    }

    handleRegisterLinkClicked = () => {

    }

    handleLoginLinkClicked = () => {
        this.setState({
            alertLoginModal: true,
        })
    }
    handleRegisterLinkClicked = () => {
        this.setState({
            alertRegisterModal: true,
        })
    }
    render = () => {
        return (
            <header className="header" id="header">
                <a className="logo-container" id="logo-container" href="">
                    <img src={logo} className="logo-img" alt="logo" />
                    <div className="logo-text">
                        <div id="name-bold">ECO</div>
                        <div id='name-medium'>Delivery</div>
                    </div>
                </a>
                {
                    this.state.isLoggedIn ?
                        <div>
                            <UserMenu userFirstname={this.state.userFirstname} />
                        </div>
                        :
                        <div className="login-register">
                            <Register className="register"
                                    showModal={this.state.alertRegisterModal || this.props.showRegisterModal}
                                    onRegisterSuccess={this.handleRegisterSuccess} 
                                    closeAlert={this.handleCloseAlert} 
                                    clickLogin={this.handleLoginLinkClicked}
                                    />
                            <Login className="login" 
                                   showModal={this.state.alertLoginModal || this.props.showLoginModal}
                                   onLoginSuccess={this.handleLoginSuccess} 
                                   onLoginFailed={this.handleLoginFailed}
                                   closeAlert={this.handleCloseAlert} 
                                   clickRegister={this.handleRegisterLinkClicked}/>
                        </div>
                }
            </header>
        );
    }
}

export default Header;