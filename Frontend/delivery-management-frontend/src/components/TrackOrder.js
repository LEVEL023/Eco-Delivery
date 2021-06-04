import React, { useState, useEffect } from 'react';
import GoogleMap from './GoogleMap';
import { getOrderDetails } from '../utils';


function TrackOrder(props) {
    
    // TrackOrder only knows order id, all other information is fetched from backend 
    const { state } = props.location
    const orderid = state.orderid

    const [senderInfo, setSenderInfo] = useState(null)
    const [receiverInfo, setReceiverInfo] = useState(null)
    const [orderStatus, setOrderStatus] = useState(null)

    useEffect(() => {
        getOrderDetails(orderid)

        
    })

    return (
        <div>Track order</div>
    )
}

export default TrackOrder;