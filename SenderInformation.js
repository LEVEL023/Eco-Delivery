import React, {Component} from 'react';

class SenderInformation extends Component {
    render() {
        const {info} = this.props;
        console.log("I got sender info as: ", info)
        const {firstName, lastName, address, email, phoneNumber} = info;
        return (
            <p className="sender-info">
                First Name: {firstName} <br/>
                Last Name: {lastName} <br/>
                Address: {address} <br/>
                Email: {email} <br/>
                Phone: {phoneNumber}
            </p>
        );
    }
}

export default SenderInformation;