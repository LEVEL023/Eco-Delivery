import React from 'react';

class UserMenu extends React.Component {

    render = () => {
        return (
            <div className="user-dropdown-container" style={{marginRight: "80px"}}>
                <button className="user-btn" id="user-btn">{this.props.userFirstname}</button>
                <ul className="user-dropdown-ul">
                    <li><a href="#" target="_blank">Account</a></li>
                    <li><a href="#" target="_blank">Order history</a></li>
                    <li><button onClick={this.onclickSignout}>Sign out</button></li>
                </ul>
            </div>
        );
    }
}

export default UserMenu;