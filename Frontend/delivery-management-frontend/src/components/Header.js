import React from 'react';
import { Button } from 'antd';
import logo from '../assets/logo.svg';
import UserMenu from './UserMenu';
import { TOKEN_KEY } from '../constants';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
            firstname: '',
        }
    }

    render = () => {
        return (
            <header className="header" id="header">
                <Link to="/" className="logo-container" id="logo-container" >
                    <img src={logo} className="logo-img" alt="logo" />
                    <div className="logo-text">
                        <div id="name-bold">ECO</div>
                        <div id='name-medium'>Delivery</div>
                    </div>
                </Link>
                {
                    this.state.isLoggedIn ?
                        <div>
                            <UserMenu userFirstname={this.state.firstname} />
                        </div>
                        :
                        <div className="login-register">
                            <div>
                                <Link to="/register" className="register" id="register-btn" >Register</Link>
                            </div>
                            <div>
                                <Link to="/login" className="login" id="login-btn" type="text" >Login</Link>
                            </div>
                        </div>
                }
            </header>
        );
    }
}

export default Header;