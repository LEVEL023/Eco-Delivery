import { Collapse, message } from 'antd';
import React from 'react';
import { placeOrder } from '../utils';
import { withRouter } from 'react-router-dom';

const { Panel } = Collapse;

class AddressForm extends React.Component {
    state = {
        activeKey: 1,
        checked: false,
        senderFirstname: '',
        senderLastname: '',
        senderPhone: '',
        senderEmail: '',
        senderAddr1: this.props.orderInfo.departure,
        senderAddr2: '',
        receiverFirstname: '',
        receiverLastname: '',
        receiverPhone: '',
        receiverEmail: '',
        receiverAddr1: this.props.orderInfo.destination,
        receiverAddr2: '',
        orderid: '',
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            ...this.props.orderInfo,
            status: 0,
            orderedTime: this.getCurrentTimeString(),
            sender: {
                firstName: this.state.senderFirstname,
                lastName: this.state.senderLastname,
                address: this.state.senderAddr1,
                phoneNumber: this.state.senderPhone,
                email: this.state.senderEmail,
            },
            recipient: {
                firstName: this.state.receiverFirstname,
                lastName: this.state.receiverLastname,
                address: this.state.receiverAddr1,
                phoneNumber: this.state.receiverPhone,
                email: this.state.receiverEmail,
            },
        }
        console.log(formData)
        placeOrder(formData)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    const orderid = res.data
                    this.setState({
                        orderid: orderid,
                    })
                }
            },
            (err) => {
                console.log("Place order failed: ", err.message)
                message.error("Place order failed! ")
            })
            .then(() => {
                this.props.history.push({
                    pathname: `/complete`,
                    state: {
                        orderid: this.state.orderid,
                    }
                })
            })
    }

    render = () => {
        return (
            <div>
            <h1 className="address-form-title">Shipping by {this.getMethodTitle()}</h1>
            <Collapse accordion
                activeKey={this.state.activeKey} >
                <Panel header="1. Sender address" key="1">
                    <form className="address-form">
                        <div>
                            <div>
                                <label>First name</label>
                                <input 
                                    type="text" name="firstname" 
                                    onChange={e => this.setState({senderFirstname: e.target.value})} 
                                    required />
                            </div>
                            <div>
                                <label>Last name</label>
                                <input 
                                    type="text" name="lastname" 
                                    onChange={e => this.setState({senderLastname: e.target.value})}
                                    required />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Phone</label>
                                <input type="text" name="phone" 
                                    onChange={e => this.setState({senderPhone: e.target.value})}
                                    required />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="text" name="email" 
                                    onChange={e => this.setState({senderEmail: e.target.value})}
                                    required />
                            </div>
                        </div>
                        <div>
                            <label>Address line 1</label>
                            <input type="text" name="addr-line-1" value={this.props.orderInfo.departure} disabled={true} required />
                        </div>
                        <div>
                            <label>Address line 2</label>
                            <input type="text" name="addr-line-2" 
                                onChange={e => this.setState({senderAddr2: e.target.value})}/>
                        </div>
                        <div>
                            <label>Zip code</label>
                            <input type="text" name="zip" value={this.props.pickupzip} disabled={true} required />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label>use default</label>
                            <input type="checkbox" name="use-default" onChange={this.handleCheckbox}/>
                        </div>
                        <input className="addr-continue-btn" type="submit" value="Continue" onClick={this.handleContinue}/>
                        <button className="addr-back-btn" onClick={this.props.onBack}>Back</button>
                    </form>
                </Panel>
                <Panel header="2. Recipient address" key="2">
                <form className="address-form">
                        <div>
                            <div>
                                <label>First name</label>
                                <input 
                                    type="text" name="firstname" 
                                    onChange={e => {this.setState({receiverFirstname: e.target.value})}}
                                    required />
                            </div>
                            <div>
                                <label>Last name</label>
                                <input 
                                    type="text" name="lastname" 
                                    onChange={e => {this.setState({receiverLastname: e.target.value})}}
                                    required />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Phone</label>
                                <input 
                                    type="text" name="phone" 
                                    onChange={e => {this.setState({receiverPhone: e.target.value})}}
                                    required />
                            </div>
                            <div>
                                <label>Email</label>
                                <input 
                                    type="text" name="email" 
                                    onChange={e => {this.setState({receiverEmail: e.target.value})}}
                                    required />
                            </div>
                        </div>
                        <div>
                            <label>Address line 1</label>
                            <input type="text" name="addr-line-1" value={this.props.orderInfo.destination} disabled={true} required />
                        </div>
                        <div>
                            <label>Address line 2</label>
                            <input 
                                type="text" name="addr-line-2" 
                                onChange={e => {this.setState({receiverAddr2: e.target.value})}}
                                required />
                        </div>
                        <div>
                            <label>Zip code</label>
                            <input type="text" name="zip" value={this.props.sendtozip} disabled={true} required />
                        </div>
                        <input className="addr-continue-btn" type="submit" value="Continue" onClick={this.handleContinue}/>
                        <button className="addr-back-btn" onClick={this.handleBack}>Back</button>
                    </form>
                </Panel>
                <Panel header="3. Review Order" key="3">
                    <div className="review-order">
                        <div>
                            <div style={{marginBottom: '4px'}}>From:</div>
                            <div>
                                <p>{this.state.senderFirstname + ' ' + this.state.senderLastname}</p>
                                <p>{this.props.orderInfo.departure}</p>
                                <p>{this.state.senderAddr2}</p>
                                <p>{this.state.senderPhone}</p>
                                <p>{this.state.senderEmail}</p>
                            </div>
                        </div>
                        <div>
                            <div style={{marginBottom: '4px'}}>To:</div>
                            <div>
                                <p>{this.state.receiverFirstname + ' ' + this.state.receiverLastname}</p>
                                <p>{this.props.orderInfo.destination}</p>
                                <p>{this.state.receiverAddr2}</p>
                                <p>{this.state.receiverPhone}</p>
                                <p>{this.state.receiverEmail}</p>
                            </div>
                        </div>
                        <div className="fixed-input">
                            <label >Delivery method: </label>
                            <input type="text" value={this.props.orderInfo.agentType} disabled={true}/>
                        </div>
                        <div className="fixed-input">
                            <label>Delivered by: </label>
                            <input type="text" value={this.props.orderInfo.deliveredTime} disabled={true} />
                        </div>
                        <div className="fixed-input">
                            <label>Payment total: </label>
                            <input type="text" value={this.props.orderInfo.cost} disabled={true} />
                        </div>
                        <div>
                        <input className="addr-continue-btn" type="submit" value="Continue" onClick={this.handleSubmit}/>
                        <button className="addr-back-btn" onClick={this.handleBack}>Back</button>
                        </div>
                    </div>
                </Panel>
          </Collapse>
          </div>
        )
    }

    handleContinue = (e) => {
        e.preventDefault()
        this.setState(prev => {
            return {
                activeKey: prev.activeKey + 1
            }
        })
    }

    handleBack = () => {
        this.setState(prev => {
            return {
                activeKey: prev.activeKey - 1
            }
        })
    }

    getMethodTitle = () => {
        let nofmethod = this.props.orderInfo.agentType
        if (nofmethod === 0) {
            return 'Drone'
        } 
        if (nofmethod === 1) {
            return 'Robot'
        }
    }
    
    getCurrentTimeString = () => {
        var d = new Date()
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        var day = d.getDay() + 1
        var currentDate = year + '-' + 
                            month.toString().padStart(2, '0') + '-' +  
                            day.toString().padStart(2, '0')
        var currentTime = d.toLocaleDateString('en-us', {
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
            second: 'numeric',
        })
        return currentDate + 'T' + currentTime.split(' ')[1]
    }
}

export default withRouter(AddressForm);