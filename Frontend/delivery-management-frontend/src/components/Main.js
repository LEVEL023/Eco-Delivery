import React from 'react';
import Ship from './Ship';
import ThankyouCard from './ThankyouCard';
import TrackOrder from './TrackOrder';
import Login from './Login';
import Register from './Register';
import AccountAndOrderTotalPage from './AccountAndOrderTotalPage';

import {
    Route, Switch
} from 'react-router';

import { TOKEN_KEY } from '../constants';

class Main extends React.Component {
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false
    }

    login = () => {
        return <Login onLoggedInSuccess={this.props.handleLoggedIn}/>
    }
    render = () => {
        return (
            <div className="main">
                <Switch>
                    <Route path="/" exact component={Ship} />
                    <Route path="/login" render={this.login} />
                    <Route path="/register" component={Register} />
                    <Route path="/complete" component={ThankyouCard} />
                    <Route path="/trackorder" component={TrackOrder} />
                    <Route path="/account" component={AccountAndOrderTotalPage} />
                </Switch>
            </div>
        )
    }
}

export default Main;