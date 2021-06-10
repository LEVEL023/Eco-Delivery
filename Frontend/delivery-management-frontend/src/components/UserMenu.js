import React from 'react';
import {Link} from 'react-router-dom';
import {TOKEN_KEY} from '../constants';

class UserMenu extends React.Component {
    state = {
        open: false,
    }

    userBtnOnClickStyle= {
        opacity: '1',
        pointerEvents: 'all',
        transform: 'translateY(0)',
    }
    userBtnOnClick = () => {
        this.setState(prev => {return {
            open: !prev.open
        }})
        // alert(this.state.open)
    }
    render = () => {
        return (
            <div className="user-dropdown-container" >
                <button className="user-btn" id="user-btn" onClick={this.userBtnOnClick}>{this.props.userFirstname}</button>
                {
                    this.state.open &&
                    <div className="user-dropdown" styles={this.userBtnOnClickStyle}>
                        <Link 
                            className="dropdown-link" 
                            to={{
                                pathname: '/account',
                                state: {
                                    tabKey: '1',
                                },
                            }}>Account</Link>
                        <Link 
                            className="dropdown-link" 
                            to={{
                                pathname: '/account',
                                state: {
                                    tabKey: '2',
                                },
                            }}>Order history</Link>
                        <button className="dropdown-link" onClick={this.props.onSignout}>Sign out</button>
                    </div>
                }
            </div>
        );
    }
}

export default UserMenu;