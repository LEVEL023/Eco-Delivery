import React from 'react';
import {Link} from 'react-router-dom';
import {TOKEN_KEY} from '../constants';

class UserMenu extends React.Component {
    onclickSignout = () => {
        console.log('removeItem')
        console.log('token is removed?' + localStorage.getItem(TOKEN_KEY))
        localStorage.removeItem(TOKEN_KEY)
    }

    render = () => {
        return (
            <div className="user-dropdown-container" style={{marginRight: "80px"}}>
                <button className="user-btn" id="user-btn">{this.props.userFirstname}</button>
                <ul className="user-dropdown-ul">
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/account">Order history</Link></li>
                    <li><button onClick={() => {alert('click')}}>Sign out</button></li>
                </ul>
            </div>
        );
    }
}

export default UserMenu;