import React from 'react';
import QuoteOrder from './QuoteOrder';
import Recommendation from './Recommendation';
import AddressForm from './AddressForm';
import { CSSTransition } from 'react-transition-group';
import { TOKEN_KEY, ID_KEY } from '../constants';
import { message } from 'antd';
import { getRecommendation } from '../utils';
import  axios  from 'axios';


class Nav extends React.Component {
    state = {
        isLoggedIn: localStorage.getItem(TOKEN_KEY) ? true : false,
        isRecommendationFetched: false,
        pickup: '',
        sendto: '',
        pickupzip: '',
        sendtozip: '',
        pickuplatlng: undefined,
        sendtolatlng: undefined,
        itemWeight: '',
        isFragile: '',
        itemType: '',
        selectedCenterId : '',
        selectedCenter : '',
        selectedCenterZip : '',
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
    // handleQuoteFormComplete = () => {
    //     this.setState({
    //         addressForm: false,
    //         nextPage: 'recommendation',
    //     })
    // }
    handleMethodSelectionComplete = (method) => {
        this.setState({
            addressForm : true,
            recommendation: false,
            lastPage: 'Recommendation',
            method: method,
        })
    }

    handleQuoteFormComplete = (formData) => {
        const { description, fragile, pickuplatlng, sendtolatlng, weight} = formData
        this.setState({
            itemWeight: weight,
            isFragile: fragile,
            itemType: description,
            pickuplatlng: pickuplatlng,
            sendtolatlng: sendtolatlng,
        })
        console.log('token -> ', localStorage.getItem(TOKEN_KEY))
        getRecommendation(weight, pickuplatlng, sendtolatlng, fragile)
            .then((response) => {
                if (response.status === 200) {
                    const recommendationData = response.data;
                    console.log(recommendationData);
                    const droneData = recommendationData[0];
                    const robotData = recommendationData[1];
                    const [ dp_year, dp_month, dp_day, dp_hour, dp_minute, dp_second ] = droneData['pickip_time']
                    const [ dd_year, dd_month, dd_day, dd_hour, dd_minute, dd_second ] = droneData['delivery_time']
                    const [ rp_year, rp_month, rp_day, rp_hour, rp_minute, rp_second ] = robotData['pickip_time']
                    const [ rd_year, rd_month, rd_day, rd_hour, rd_minute, rd_second ] = robotData['delivery_time']
                    // passing rest of byRobotData and byDroneData down -> Recommendation 
                    this.setState({
                        recommendation: true,
                        quoteOrder: false,
                        lastPage: 'quoteOrder',
                        isRecommendationFetched: true,
                        byRobotData: {
                            fee: Number.parseFloat(robotData.cost).toPrecision(4),
                            estDate: rd_year + '-' + rd_month.toString().padStart(2, '0') + '-' + rd_day.toString().padStart(2, '0'),
                            estTime: 'T' + rd_hour.toString().padStart(2, '0') + ':' + rd_minute.toString().padStart(2, '0') + ':' + rd_second.toString().padStart(2, '0'),
                            pickupDate: rp_year + '-' + rp_month.toString().padStart(2, '0') + '-' + rp_day.toString().padStart(2, '0'),
                            pickupTime: 'T' + rp_hour.toString().padStart(2, '0') + ':' + rp_minute.toString().padStart(2, '0') + ':' + rp_second.toString().padStart(2, '0'),
                            centerLocation: robotData.dispatch_location,
                            centerId : robotData.dispatch_center_id,
                            // fee: Number.parseFloat(robotData.cost).toPrecision(4),
                            // estDate: robotData.delivery_time.split('T')[0],
                            // estTime: robotData.delivery_time.split('T')[1].split('.')[0],
                            // pickupDate: robotData.pickip_time.split('T')[0],
                            // pickupTime: robotData.pickip_time.split('T')[1].split('.')[0],
                            // centerLocation: robotData.dispatch_location,
                            // centerId : robotData.dispatch_center_id,
                        },
                        byDroneData: {
                            fee: Number.parseFloat(droneData.cost).toPrecision(4),
                            estDate: dd_year + '-' + dd_month.toString().padStart(2, '0') + '-' + dd_day.toString().padStart(2, '0'),
                            estTime: 'T' + dd_hour.toString().padStart(2, '0') + ':' + dd_minute.toString().padStart(2, '0') + ':' + dd_second.toString().padStart(2, '0'),
                            pickupDate: dp_year + '-' + dp_month.toString().padStart(2, '0') + '-' + dp_day.toString().padStart(2, '0'),
                            pickupTime: 'T' + dp_hour.toString().padStart(2, '0') + ':' + dp_minute.toString().padStart(2, '0') + ':' + dp_second.toString().padStart(2, '0'),
                            centerLocation: droneData.dispatch_location,
                            centerId : droneData.dispatch_center_id,
                            // fee: Number.parseFloat(droneData.cost).toPrecision(4),
                            // estDate: droneData.delivery_time.split('T')[0],
                            // estTime: droneData.delivery_time.split('T')[1].split('.')[0],
                            // pickupDate: droneData.pickip_time.split('T')[0],
                            // pickupTime: droneData.pickip_time.split('T')[1].split('.')[0],
                            // centerLocation: droneData.dispatch_location,
                            // centerId : droneData.dispatch_center_id,
                        }
                    })
                    this.props.onQuoteFormComplete()
                }
            }).catch((err) => {
                console.log("recommendation failed: ", err.message);
                message.error("Recommendation failed! ");
            });
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
    // onCenterSelected = (query, centerId, deliveryType) => {
    //     const addressSplit = query.split(", ")
    //     const zip = addressSplit[addressSplit.length - 2].split(" ")[1]
    //     // this.setState({
    //     //     selectedCenter : query,
    //     //     selectedCenterZip : zip,
    //     //     selectedCenterId : centerId,
    //     // })
    //     this.props.onCenterSelected(query, centerId, deliveryType);
    // }
    getDeliveredBy = () => {
        if (this.state.method === 'robot') {
            return (this.state.byRobotData.estDate + this.state.byRobotData.estTime)
        }
        if (this.state.method === 'drone') {
            return (this.state.byDroneData.estDate + this.state.byDroneData.estTime)
        }
    }
    getPickedupBy = () => {
        if (this.state.method === 'robot') {
            return (this.state.byRobotData.pickupDate + this.state.byRobotData.pickupTime)
        }
        if (this.state.method === 'drone') {
            return (this.state.byDroneData.pickupDate + this.state.byDroneData.pickupTime)
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
    getCenterID = () => {
        if (this.state.method === 'robot') {
            return parseInt(this.state.byRobotData.centerId.split('_')[1])
        }
        if (this.state.method === 'drone') {
            return parseInt(this.state.byDroneData.centerId.split('_')[1])
        }
    }

    getAgentType = () => {
        if (this.state.method === 'robot') {
            return 1
        } 
        if (this.state.method === 'drone') {
            return 0
        }
    }

    getAddressFormProps = () => {
        if (this.state.isRecommendationFetched) {
            return {

                departure: this.state.pickup,
                depLat: this.state.pickuplatlng.lat,
                depLng: this.state.pickuplatlng.lng,
                destination: this.state.sendto,
                desLat: this.state.sendtolatlng.lat,
                desLng: this.state.sendtolatlng.lng,
                status: null,
                orderedTime: null,
                pickupTime: this.getPickedupBy(),
                deliveredTime: this.getDeliveredBy(),
                cost: parseFloat(this.getPaymentAmount()),
                rating: null,
                centerID: this.getCenterID(),
                agentType: this.getAgentType(),
                item: {
                    weight: parseInt(this.state.itemWeight),
                    isFragile: this.state.isFragile,
                    type: this.state.itemType,
                    amount: 1,
                },
                account: {
                    id: parseInt(localStorage.getItem(ID_KEY))
                },
                useRecommendation: null,

            }
        } else {
            return null
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
                        onBack={this.handleRecommendationBack} 
                        onCenterSelected = {this.props.onCenterSelected}/>
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
                        pickupzip={this.state.pickupzip}
                        sendtozip={this.state.sendtozip}
                        orderInfo={this.getAddressFormProps()}
                        onBack={this.handleFormBack}/>
                </CSSTransition>
            </div>

        )
    }
}

export default Nav;
