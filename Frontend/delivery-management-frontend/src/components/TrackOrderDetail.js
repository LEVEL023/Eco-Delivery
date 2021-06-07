import React, { useState, useEffect } from 'react';
import { getOrderDetails, cancelOrder } from '../utils';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


function TrackOrderDetail(props) {
    
    // // TrackOrder only knows order id, all other information is fetched from backend 
    // const { state } = props.location
    // const orderid = state.orderid
    const { orderid, onInfoReceived } = props;

    const [infoRetrived, setInfoRetrived] = useState(false)
    const [senderInfo, setSenderInfo] = useState(null)
    const [receiverInfo, setReceiverInfo] = useState(null)
    const [objectInfo, setObjectInfo] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const [canCancel, setCanCancel] = useState(false)

    const history = useHistory()

    useEffect(() => {
        // // don't forget to go to utils, make getOrderDetails method return a single js object containing fetch response
        // const orderDetails = getOrderDetails(orderid)
        // setSenderInfo(orderDetails.senderInfo)
        // setReceiverInfo(orderDetails.receiverInfo)
        // setObjectInfo(orderDetails.objectInfo)
        // setOrderInfo(orderDetails.orderInfo)
        const fakeSender = {
            firstname: 'Jane',
            lastname: 'Joe',
            phone: '123-321-4321',
            email: '123@123.com',
            addr1: '654 Main St, San Franciso, CA',
            addr2: 'Apt 666',
            latlng: {
                lat: 37.776174,
                lng: -122.445785,
            },
            zip: '98888',
        }
        const fakeReceiver = {
            firstname: 'Bob',
            lastname: 'Foo',
            phone: '987-654-3210',
            email: '789@789.com',
            addr1: '99 Broadway, San Francisco, CA',
            addr2: 'Apt 999',
            latlng: {
                lat: 37.6213129,
                lng: -122.3789554,
            },
            zip: '96666',
        }
        const fakeObject = {
            type: 'foods',
            weight: '6',
            fragile: true,
        }
        const fakeOrder = {
            orderstatus: 'not picked up',
            creationDate: 'Sat 10 Aug 2099',
            creationTime: '2:00 PM',
            method: 'drone',
            fee: '9.99',
            pickupDate: 'Mon 12 Aug 2099',
            pickupTime: '12:00 PM',
            estDelivDate: 'Tue 13 Aug 2099',
            estDelivTime: '7:00 PM',
        }
        if (fakeOrder.orderstatus === 'not picked up') {
            setCanCancel(true)
        }
        setSenderInfo(fakeSender)
        setReceiverInfo(fakeReceiver)
        setObjectInfo(fakeObject)
        setOrderInfo(fakeOrder)
        setInfoRetrived(true)
        const latlngs = {
            pickup: fakeSender.latlng,
            sendto: fakeReceiver.latlng,
        }
        //setstate is async, remember to change this to a promise
        onInfoReceived(latlngs, fakeOrder.method)
    }, [])

    const handleCancel = () => {
        // post request backend to change order status, returns status code
        // const isCancelSuccess = cancelOrder()
        const isCancelSuccess = true
        if (isCancelSuccess) {
            const newOrderInfo = {...orderInfo}
            newOrderInfo.orderstatus = 'cancelled'
            setOrderInfo(newOrderInfo)
            setCanCancel(false)
        }
    }

    const renderOrderStatus = () => {
        if (orderInfo.orderstatus === 'cancelled') {
            return <p>{`Order ${orderid} is cancelled`}</p>
        } else {
            return <p>{`Scheduled to arrive on ${orderInfo.estDelivDate}, ${orderInfo.estDelivTime}`}</p>
        }

    }

    const handleBack = (e) => {
        e.preventDefault()
        history.goBack()
    }

    return (
        <div className="track-grid">
            <LeftOutlined onClick={handleBack}/>
            {
            infoRetrived &&
            <>
            <div className="track-icon">
                <img />
            </div>
            <div className="track-title">
                <h1>{objectInfo.type}</h1>
                {renderOrderStatus()}
            </div>
            <div className="track-empty-grid"></div>
            <div>
                <p>{`Created on: ${orderInfo.creationDate}, ${orderInfo.creationTime}`}</p>
                <p>{`Weight of object: ${objectInfo.weight} lbs`}</p>
                <p>{`Amount paid: ${orderInfo.fee}`}</p>
            </div>
            <div className="track-sender-title">
                <p>Sender</p>
            </div>
            <div>
                <p>{`${senderInfo.firstname} ${senderInfo.lastname}`}</p>
                <p>{`${senderInfo.addr1}  ${senderInfo.zip}`}</p>
                <p>{`${senderInfo.addr2}`}</p>
                <p>{`${senderInfo.email}`}</p>
                <p>{`${senderInfo.phone}`}</p>
            </div>
            <div className="track-receiver-title">
                <p>Receiver</p>
            </div>
            <div>
            <p>{`${receiverInfo.firstname} ${receiverInfo.lastname}`}</p>
                <p>{`${receiverInfo.addr1}  ${receiverInfo.zip}`}</p>
                <p>{`${receiverInfo.addr2}`}</p>
                <p>{`${receiverInfo.email}`}</p>
                <p>{`${receiverInfo.phone}`}</p>
            </div>
            <div>
                {canCancel && <button onClick={handleCancel}>Cancel order</button>}
            </div>
            </>}
        </div>
    )
}

export default TrackOrderDetail;