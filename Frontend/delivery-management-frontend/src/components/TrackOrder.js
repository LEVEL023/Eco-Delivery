import React, { useState } from 'react';
import GoogleMap from './GoogleMap';
import TrackOrderDetail from './TrackOrderDetail';

function TrackOrder(props) {

    const { state } = props.location
    const orderid = state.orderid

    const [method, setMethod] = useState('')
    const [pickuplatlng, setPickuplatlng] = useState(null)
    const [sendtolatlng, setSendtolatlng] = useState(null)
    const [showDrone, setShowDrone] = useState(false)
    const [showRobot, setShowRobot] = useState(false)

    const handleInfoReceived = (latlngs, method) => {
        setPickuplatlng(latlngs.pickup)
        setSendtolatlng(latlngs.sendto)
        if (method === 'drone') {
            setShowDrone(true)
        }
        if (method === 'robot') {
            setShowRobot(true)
        }
    }

    return (
        <div id="track">
            <section className="track-map">
                <GoogleMap 
                    style={{zIndex: '99'}}
                    pickup={pickuplatlng}
                    sendto={sendtolatlng}
                    showDrone={showDrone}
                    showRobot={showRobot} />
            </section>
            <aside className="track-nav">
                <TrackOrderDetail 
                    orderid={orderid}
                    onInfoReceived={handleInfoReceived}/>
            </aside>
        </div>
    )
}

export default TrackOrder;