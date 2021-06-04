import React from 'react';
import Ship from './Ship';
import ThankYouPage from './ThankYouPage';
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
                    <Route path="/complete" component={ThankYouPage} />
                    <Route path="/trackorder" component={TrackOrder} />
                    <Route path="/account" component={AccountAndOrderTotalPage} />
                </Switch>
            </div>
        )
    }
}

export default Main;