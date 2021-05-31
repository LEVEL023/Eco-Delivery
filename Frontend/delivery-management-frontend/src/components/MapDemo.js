import React, { useState } from 'react';
import { Row, Col } from 'antd';
import MapContainer from './MapContainer';
import Locations from './Locations';

import {GEOCODE_BASE_URL, GOOGLE_MAP_API_KEY} from '../constants';


const MapDemo = () => {
    const [pickupAddress, setPickupAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [pickupGeo, setPickupGeo] = useState();
    const [destinationGeo, setDestinationGeo] = useState();
    const [showMarker, setShowMarker] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [showRoute, setShowRoute] = useState(false);
    
    function lineOnClick() {
        setShowLine(true);
    }

    function routeOnClick() {
        setShowRoute(true);
    }

    function markerOnClick(locationData) {
        const {pickup, destination} = locationData;
        console.log(locationData);
        console.log(pickup);
        console.log(destination);
        
        setPickupAddress(pickup);
        setDestinationAddress(destination);

        const pickup_url = `${GEOCODE_BASE_URL}address=${pickup.split(' ').join('+')}&key=${GOOGLE_MAP_API_KEY}`;
        const destination_url = `${GEOCODE_BASE_URL}address=${destination.split(' ').join('+')}&key=${GOOGLE_MAP_API_KEY}`;
        //geocode: address => lat and lng
        fetch(pickup_url)
        .then(response => {
            return response.json();
        }).then(data => {
            setPickupGeo(data.results[0].geometry.location);            
        });

        fetch(destination_url)
        .then(response => {
            return response.json();
        }).then(data => {
            setDestinationGeo(data.results[0].geometry.location);            
        });

        setShowMarker(true);                
    }


    return (
        <Row>
            <Col span={16}>
                <MapContainer 
                showMarker={showMarker}
                showLine={showLine}
                showRoute={showRoute}
                pickupGeo={pickupGeo} 
                destinationGeo={destinationGeo}
                pickupAddress={pickupAddress}
                destinationAddress={destinationAddress}
                 />
            </Col>
            <Col span={8}>
                <Locations 
                markerOnClick={markerOnClick}  
                lineOnClick={lineOnClick}
                routeOnClick={routeOnClick}             
                />
            </Col>
        </Row>
    )
}

export default MapDemo;