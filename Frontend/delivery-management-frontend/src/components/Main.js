import React from 'react';
import Ship from './Ship';
import ThankyouCard from './ThankyouCard';
import TrackOrder from './TrackOrder';
import AccountPage from './AccountPage';
import Login from './Login';
import Register from './Register';

import {
    Route, Switch
} from 'react-router';

import { TOKEN_KEY } from '../constants';

class Main extends React.Component {
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false
    }

    login = () => {
        return <Login onLoggedIn={this.props.onLoggedIn}/>
    }
    register = () => {
        return <Register onRegistered={this.props.onRegistered}/>
    }


    render = () => {
        return (
            <div className="main">
                <Switch>
                    <Route path="/" exact component={Ship} />
                    <Route path="/login" render={this.login} />
                    <Route path="/register" render={this.register} />
                    <Route path="/complete" component={ThankyouCard} />
                    <Route path="/trackorder" component={TrackOrder} />
                    <Route path="/account" component={AccountPage} />
                </Switch>
            </div>
        )
    }
}

export default Main;