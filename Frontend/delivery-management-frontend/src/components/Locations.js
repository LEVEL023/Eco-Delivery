import { useRef } from 'react';

const Locations = (props) => {
    const pickupInputRef = useRef();
    const destinationInputRef = useRef();

    function markerHandler(event) {
        
        const pickupAddress = pickupInputRef.current.value;
        const destinationAddress = destinationInputRef.current.value;

        const locationData = {
            pickup: pickupAddress,
            destination: destinationAddress,
        };
        props.markerOnClick(locationData);
    }

    

    return (
        <div>
            <div>
                Pick up:
                <input type='text' ref={pickupInputRef} defaultValue='1461 Kansas St, San Francisco, CA 94107'/>
            </div>
            <div>
                Destination:
                <input type='text' ref={destinationInputRef} defaultValue='247 Gates St, San Francisco, CA 94110'/>
            </div>
            <div>
                <button onClick={markerHandler}>Marker</button>
                <button onClick={props.lineOnClick}>Line</button>
                <button onClick={props.routeOnClick}>Route</button>              
            </div>
            
        </div>
    )
    
}

export default Locations;