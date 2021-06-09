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
    const [orderInfo, setOrderInfo] = useState(null)   //0: place, 1: picked, 2: completed, 3: cancaled
    const [canCancel, setCanCancel] = useState(false)

    const history = useHistory()

    useEffect(() => {
        getOrderDetails(orderid)
            .then((res) => {
                console.log(res)
                const { data } = res
                const senderInfo = {
                    firstname: data.sender.firstName,
                    lastname: data.sender.lastname,
                    phone: data.sender.phoneNumber,
                    email: data.sender.email,
                    addr1: data.sender.address,
                    addr2: '',
                    latlng: {
                        lat: data.depLat,
                        lng: data.depLng,
                    },
                    zip: '',
                }
                const ReceiverInfo = {
                    firstname: data.recipient.firstname,
                    lastname: data.recipient.lastname,
                    phone: data.recipient.phone,
                    email: data.recipient.email,
                    addr1: data.recipient.address,
                    addr2: '',
                    latlng: {
                        lat: data.desLat,
                        lng: data.desLng,
                    },
                    zip: '',
                }
                const objectInfo = {
                    type: data.item.type,
                    weight: data.item.weight,
                    fragile: data.item.isFragile,
                }
                const orderInfo = {
                    orderstatus: data.status,
                    creationDate: data.orderedTime,
                    creationTime: '',
                    method: data.agentType,
                    fee: data.item.amount,
                    pickupDate: data.pickupTime,
                    pickupTime: '',
                    estDelivDate: data.deliveredTime,
                    estDelivTime: '',
                }
                if (orderInfo.orderstatus == '0') {
                    setCanCancel(true)
                }
                setSenderInfo(senderInfo)
                setReceiverInfo(receiverInfo)
                setObjectInfo(objectInfo)
                setOrderInfo(orderInfo)
                setInfoRetrived(true)
            },
            (err) => {
                console.log(err)
            })
            .then(() => {
                const latlngs = {
                    pickup: this.state.senderInfo.latlng,
                    sendto: this.state.receiverInfo.latlng,
                }
                //setstate is async, remember to change this to a promise
                onInfoReceived(latlngs, this.state.orderInfo.method)
            })
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
        <div>
            <LeftOutlined 
                className="track-back-icon"
                onClick={handleBack}/>
            {
            infoRetrived &&
            <>
            <div className="track-grid">
            <div className="track-icon">
                <img />
            </div>
            <div className="track-title">
                <h1>{objectInfo.type}</h1>
                {renderOrderStatus()}
            </div>
            <div className="track-empty-grid"></div>
            <div className="track-order-info"> 
                <p>{`Created on: ${orderInfo.creationDate}, ${orderInfo.creationTime}`}</p>
                <p>{`Weight of object: ${objectInfo.weight} lbs`}</p>
                <p>{`Amount paid: ${orderInfo.fee}`}</p>
            </div>
            <div className="track-sender-title">
                <p>Sender</p>
            </div>
            <div className="track-sender-info">
                <p>{`${senderInfo.firstname} ${senderInfo.lastname}`}</p>
                <p>{`${senderInfo.addr1}  ${senderInfo.zip}`}</p>
                <p>{`${senderInfo.addr2}`}</p>
                <p>{`${senderInfo.email}`}</p>
                <p>{`${senderInfo.phone}`}</p>
            </div>
            <div className="track-receiver-title">
                <p>Receiver</p>
            </div>
            <div className="track-receiver-info">
            <p>{`${receiverInfo.firstname} ${receiverInfo.lastname}`}</p>
                <p>{`${receiverInfo.addr1}  ${receiverInfo.zip}`}</p>
                <p>{`${receiverInfo.addr2}`}</p>
                <p>{`${receiverInfo.email}`}</p>
                <p>{`${receiverInfo.phone}`}</p>
            </div>
            </div>
            <div>
                {canCancel && <button className="cancel-btn" onClick={handleCancel}>Cancel order</button>}
            </div>
            </>}
        </div>
    )
}

export default TrackOrderDetail;