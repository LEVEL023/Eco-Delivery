import React from 'react';
import QuoteOrder from './QuoteOrder';
import Recommendation from './Recommendation';
import FillAddress from './FillAddress';
import { CSSTransition } from 'react-transition-group';
import { TOKEN_KEY } from '../constants';

class Nav extends React.Component {

    // state stores all order information 
    // exchange data with backend
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
        pickup: '',
        sendto: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        byRobotData: undefined,
        byDroneData: undefined,
        method: '',
        quoteOrder: true,
        recommendation: false,
        addressForm: false,
        nextPage: '',
        lastPage: '',
    }

    pageSwitch = (pagenumber) => {
        switch (pagenumber) {
            case 1:
                return (
                    <QuoteOrder onPlaceSelected={this.handlePlaceSelected} onSubmit={this.handleQuoteFormComplete} />
                )
            case 2:
                return (
                    <Recommendation
                        robot={this.state.byRobotData}
                        drone={this.state.byDroneData}
                        onContinue={this.handleMethodSelectionComplete}
                        onBack={this.handleRecommendationBack} />
                )
            case 3:
                return (
                    <FillAddress pickup={this.state.pickup} sendto={this.state.sendto} />
                )
        }
    }
    handleRecommendationBack = () => {
        this.setState({
            recommendation: false,
            nextPage: 'quoteOrder',
            method: '',
        })
    }

    handlePlaceSelected = (name, query, latlng) => {
        this.setState({
            [name]: query,
            [name + 'latlng']: latlng,
        })
        this.props.onPlaceSelected(name, query, latlng)
    }

    handleMethodSelectionComplete = (method) => {
        this.setState({
            addressForm : true,
            recommendation: false,
            lastPage: 'Recommendation',
            method: method,
        })
    }


    handleQuoteFormComplete = (formData) => {
        if (!this.state.isLoggedIn) {
            console.log('Nav: not loggedin')
            this.props.alertLogin();
        } else {
            console.log('Nav: handleQuoteFormComplete: loggedin')
            this.setState({
                recommendation: true,
                lastPage: 'quoteOrder',
                byRobotData: {
                    fee: '15.99',
                    estDate: "May 16 2021",
                    estTime: "12:21 PM",
                    pickupDate: "May 14 2021",
                    pickupTime: "8:30 AM",
                },
                byDroneData: {
                    fee: '25.99',
                    estDate: "May 14 2021",
                    estTime: "12:21 PM",
                    pickupDate: "May 14 2021",
                    pickupTime: "8:30 AM",
                }
            })
        // fetch recommendation data from backend
        // const { username, password } = formData;
        // const opt = {
        //     method: 'get',
        //     url: `${BASE_URL}/recommend`,
        //     data: {
        //         ...formData // ??? what location data do you need: address? latlng?
        //     },
        //     headers: { 
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        //     }
        // };
        // axios(opt)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             const { responseData } = res;
        //             // GET recommendation data and setState 
        //             this.setState({
        //                 pageDisplay: 2,
        //                 byDroneData: responseData['Drone'],
        //                 byRobotData: responseData['Robot']
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("recommendation failed: ", err.message);
        //         // message.error("Recommendation failed! ");
        //     });
        }
    }

    transitionOnEnter = () => {
        if (this.state.lastPage !== '') {
            this.setState({
                [this.state.lastPage]: false,
                lastPage: '',
            })
        }
    }

    transitionOnExited = () => {
        if (this.state.nextPage !== '') {
            this.setState({
                [this.state.nextPage]: true,
                nextPage: '',
            })
        }
    }
    render = () => {
        return (
            <div>
                <CSSTransition 
                    in={this.state.quoteOrder}
                    timeout={{
                        enter: 800,
                        exit: 300,
                    }}
                    classNames="show-quote-order"
                    unmountOnExit
                    onEnter={this.transitionOnEnter}
                    onExited={this.transitionOnExited}
                    >
                    <QuoteOrder onPlaceSelected={this.handlePlaceSelected} onSubmit={this.handleQuoteFormComplete} />
                </CSSTransition>
                <CSSTransition 
                    in={this.state.recommendation}
                    timeout={{
                        enter: 800,
                        exit: 300,
                    }}
                    classNames="show-recommendation"
                    unmountOnExit
                    onEnter={this.transitionOnEnter}
                    onExited={this.transitionOnExited}
                    >
                    <Recommendation
                        robot={this.state.byRobotData}
                        drone={this.state.byDroneData}
                        onContinue={this.handleMethodSelectionComplete}
                        onBack={this.handleRecommendationBack} />
                </CSSTransition>
                <CSSTransition 
                    in={this.state.addressForm}
                    timeout={{
                        enter: 800,
                        exit: 300,
                    }}
                    classNames="show-address-form"
                    unmountOnExit
                    onEnter={this.transitionOnEnter}
                    onExited={this.transitionOnExited}
                    >
                    <FillAddress pickup={this.state.pickup} sendto={this.state.sendto} />
                </CSSTransition>
            </div>

            // <div>
            //     { this.pageSwitch(this.state.pageDisplay) }
            // </div>
        )
    }
}

export default Nav;
