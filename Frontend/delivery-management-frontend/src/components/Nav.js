import React from 'react';
import QuoteOrder from './QuoteOrder';
import Recommendation from './Recommendation';
import FillAddress from './FillAddress';
import AddressForm from './AddressForm';
import { CSSTransition } from 'react-transition-group';
import { TOKEN_KEY } from '../constants';
import {getRecommendation, calculateDistanceForRecommendation, calculateDistanceForRecommendation_copy} from '../utils';
import  axios  from 'axios';


class Nav extends React.Component {

    // state stores all order information 
    // exchange data with backend
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
        pickup: '',
        sendto: '',
        pickupzip: '',
        sendtozip: '',
        byRobotData: undefined,
        byDroneData: undefined,
        method: '',
        quoteOrder: true,
        recommendation: false,
        addressForm: false,
        nextPage: '',
        lastPage: '',
    }

    handleRecommendationBack = () => {
        this.setState({
            recommendation: false,
            nextPage: 'quoteOrder',
            method: '',
        })
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
            console.log({
                pickupzip: this.state.pickupzip,
                sendtozip: this.state.sendtozip
            })
            console.log(formData);
            const departure = formData.pickuplatlag;
            const destination = formData.sendtolatlng;
            const recommendedData = calculateDistanceForRecommendation_copy(formData.weight,departure,destination, formData.fragile);
            console.log(recommendedData);
            // passing rest of byRobotData and byDroneData down -> Recommendation 
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
            this.props.onQuoteFormComplete()
            //passing centerGeo up -> Main
            const centerData = {
                robotCenter: {
                    lat: 37.77493,
                    lng: -122.419415,
                },
                droneCenter: {
                    lat: 37.77493,
                    lng: -122.419415,
                }
            }
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
        //             // passing centerGeo up -> Main
        //             const droneCenterGeo = responseData['drone'].centerGeo;
        //             const robotCenterGeo = responseData['robot'].centerGeo;
        //             // GET recommendation data and setState -> Recommendation
        //             this.setState({
        //                 recommendation: true,
        //                 lastPage: 'quoteOrder',
        //                 byDroneData: responseData['drone'],
        //                 byRobotData: responseData['robot']
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("recommendation failed: ", err.message);
        //         // message.error("Recommendation failed! ");
        //     });
        
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

    onOriginSelected = (query, latlng) => {
        const addressSplit = query.split(", ")
        const zip = addressSplit[addressSplit.length - 2].split(" ")[1]
        this.setState({
            pickup: query,
            pickupzip: zip,
        })
        this.props.onOriginSelected(query, latlng)
    }
    onDestinationSelected = (query, latlng) => {
        const addressSplit = query.split(", ")
        const zip = addressSplit[addressSplit.length - 2].split(" ")[1]
        this.setState({
            sendto: query,
            sendtozip: zip,
        })
        this.props.onDestinationSelected(query, latlng)
    }

    getDeliveredBy = () => {
        if (this.state.method === 'robot') {
            return (this.state.byRobotData.estDate + ', ' + this.state.byRobotData.estTime)
        }
        if (this.state.method === 'drone') {
            return (this.state.byDroneData.estDate + ', ' + this.state.byDroneData.estTime)
        }
    }
    getPaymentAmount = () => {
        if (this.state.method === 'robot') {
            return this.state.byRobotData.fee
        }
        if (this.state.method === 'drone') {
            return this.state.byDroneData.fee
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
                    <QuoteOrder onOriginSelected={this.onOriginSelected} 
                                onDestinationSelected={this.onDestinationSelected} 
                                onSubmit={this.handleQuoteFormComplete} />
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
                    <AddressForm 
                        pickup={this.state.pickup} 
                        sendto={this.state.sendto}
                        pickupzip={this.state.pickupzip}
                        sendtozip={this.state.sendtozip} 
                        method={this.state.method}
                        deliveredby={this.getDeliveredBy()}
                        paytotal={this.getPaymentAmount()} />
                </CSSTransition>
            </div>

        )
    }
}

export default Nav;
