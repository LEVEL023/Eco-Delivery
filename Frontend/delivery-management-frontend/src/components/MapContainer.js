import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../constants';


const MapContainer = (props) => {

    console.log(props)
    const [response, setResponse] = useState();
    const [requestDir, setRequestDir] = useState(true);

        // const [show]

    const mapCenter = {
        lat: 37.76,
        lng: -122.45
    }

    const dispatchGeo = {
        lat: 37.7774943,
        lng: -122.4171334
    }

    const dispatchAddress = "1390 Market St Lbby, San Francisco, CA 94102";

    const mapContainerStyle = {
        height: "800px",
        width: "800px"
    }

    function directionsCallback(response) {
        console.log(response)
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response);
                setRequestDir(false);
            }
        }
    }

    const { showMarker, showLine, showRoute, pickupGeo, destinationGeo, pickupAddress, destinationAddress } = props;

    return (

        <LoadScript
            googleMapsApiKey={GOOGLE_MAP_API_KEY}>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={mapCenter}>
                {
                    showMarker && (
                        <div>
                            <Marker position={dispatchGeo} />
                            <Marker position={pickupGeo} />
                            <Marker position={destinationGeo} />
                        </div>
                    )
                }
                {
                    showLine && (
                        <Polyline options={{
                            path: [dispatchGeo, pickupGeo, destinationGeo],
                            geodesic: true,
                            strokeColor: "#00FF00",
                            strokeOpacity: 1.0,
                            strokeWeight: 5,
                        }}
                        />
                    )
                }
                {showRoute && requestDir && (
                    <DirectionsService
                        options={{
                            destination: destinationAddress,
                            origin: dispatchAddress,
                            waypoints: [{ location: pickupAddress, stopover: true }],
                            travelMode: 'DRIVING'
                        }}
                        callback={directionsCallback}
                    />)
                }
                {response != null && (
                    <DirectionsRenderer
                        options={{
                            directions: response,
                        }}
                    />)
                }


            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;