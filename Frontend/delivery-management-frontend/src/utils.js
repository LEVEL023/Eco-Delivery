import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_API_KEY, dispatchCenter_1, dispatchCenter_2, dispatchCenter_3, BASE_URL, metersToMiles } from './constants';
import  axios  from 'axios';
import { TOKEN_KEY } from  './constants';
import { message } from 'antd';

export const mapLoader = () => {
    const loader = new Loader({
      apiKey: GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ['drawing', 'places'],
    });
    console.log(loader)
    return loader.load()
}

// provide order id
// returns order details
// {
//   senderInfo: {
//     firstname:,
//     lastname:,
//     phone:,
//     email:,
//     addr1:,
//     addr2:,
//     zip:,
//   },
//   receiverInfo: {
//     firstname:,
//     lastname:,
//     phone:,
//     email:,
//     addr1:,
//     addr2:,
//     zip:,
//   },
//   objectInfo: {
//     type:,
//     weight:,
//     fragile:,
//   }
//   orderInfo: {
//     fee:,
//     creationDate:,
//     creationTime:,
//     pickupDate:,
//     pickupTime:,
//     estDelivDate:,
//     estDelivTime:,
//   }
// }
export const getOrderDetails = (orderid) => {

}

export const cancelOrder = () => {
  
}

// provide order details 
// returns order id
export const submitOrder = (formData) => {
  const opt = {
    method: 'post',
    url: `{BASE_URL}/submit_order`,
    data: {
      ...formData
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
  }
  axios(opt)
    .then((res) => {
      if (res.status === 200) {
        const { responseData } = res;
        // return an order id 
        this.setState({
          orderid: res.orderid
        })
      }
    })
    .catch((err) => {
      console.log("submit order failed: ", err.message)
    })
}
// Prepare recommendation api parameters
export const calculateDistanceForRecommendation = (weight, departure, destination, isFragile) => {
  const distance = {};
  const dep = new window.google.maps.LatLng(departure.lat, departure.lng);
  const des = new window.google.maps.LatLng(destination.lat, destination.lng);
  const center_0 = new window.google.maps.LatLng(dispatchCenter_1.lat, dispatchCenter_1.lng);
  const center_1 = new window.google.maps.LatLng(dispatchCenter_2.lat, dispatchCenter_2.lng);
  const center_2 = new window.google.maps.LatLng(dispatchCenter_3.lat, dispatchCenter_3.lng);
  const directionsService = new window.google.maps.DirectionsService();
  const request_0 = {
    origin : center_0,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  const request_1 = {
    origin : center_1,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  const request_2 = {
    origin : center_2,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  directionsService.route(request_0,
    (respose, status) => {
      if (status === "OK") {
        const distanceObj =  respose['routes'][0]['legs'];
        distance.robot_distance_0 = distanceObj[0]['distance']['value']*metersToMiles;
        distance.robot_distance_des = distanceObj[1]['distance']['value']*metersToMiles;
      } else {
        console.log("Fail to get dispatch Center 0 distance", status);
      }
    }
  )
  directionsService.route(request_1,
    (respose, status) => {
      if (status === "OK") {
        const distanceObj =  respose['routes'][0]['legs'];
        distance.robot_distance_1 = distanceObj[0]['distance']['value']*metersToMiles;
      } else {
        console.log("Fail to get dispatch Center 1 distance", status);
      }
    }
  )
  directionsService.route(request_2,
    (respose, status) => {
      if (status === "OK") {
        const distanceObj =  respose['routes'][0]['legs'];
        distance.robot_distance_2 = distanceObj[0]['distance']['value']*metersToMiles;
      } else {
        console.log("Fail to get dispatch Center 2 distance", status);
      }
    }
  )
  distance.drone_distance_0 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_1.lat, dispatchCenter_1.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_1 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_2.lat, dispatchCenter_2.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_2 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_3.lat, dispatchCenter_3.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_des = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(departure.lat, departure.lng),  new window.google.maps.LatLng(destination.lat, destination.lng))*metersToMiles;
  console.log(distance);

  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone_distance_0}&drone_distance_1=${distance.drone_distance_1}$drone_distance_2=${distance.drone_distance_2}&drone_distance_des=${distance.drone_distance_des}` + 
    `&robot_distance_0=${distance.robot_distance_0}&robot_distance_1=${distance.robot_distance_1}&robot_distance_2=${distance.robot_distance_2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${isFragile}`,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin' : '*'
    }
  }
  // call recommendation api
  let recommendedData;
  axios(opt)
    .then((res) => {
        if (res.status === 200) {
            const { responseData } = res;
            recommendedData = responseData;
        }
    })
    .catch((err) => {
        console.log("recommendation failed: ", err.message);
        message.error("Recommendation failed! ");
    });
  return recommendedData;
}
export const getRecommendation = (weight, departure, destination, isFragile) => {
  const distance = calculateDistanceForRecommendation(departure, destination);
  console.log("Wait a second");
  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone_distance_0}&drone_distance_1=${distance.drone_distance_1}$drone_distance_2=${distance.drone_distance_2}&drone_distance_des=${distance.drone_distance_des}` + 
    `&robot_distance_0=${distance.robot_distance_0}&robot_distance_1=${distance.robot_distance_1}&robot_distance_2=${distance.robot_distance_2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${isFragile}`,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin' : '*'
    }
  }
  // call recommendation api
  let recommendedData;
  axios(opt)
    .then((res) => {
        if (res.status === 200) {
            const { responseData } = res;
            recommendedData = responseData;
        }
    })
    .catch((err) => {
        console.log("recommendation failed: ", err.message);
        message.error("Recommendation failed! ");
    });
  return recommendedData;
}

export const getAllOrder = (userId) => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_orders/${userId}`,
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios(opt)
    .then((res) => {
      if (res.status === 200) {
        const { responseData } = res;
        // return all orders
      }
    })
    .catch((err) => {
      console.log("get All order by userId failed: ", err.message)
    })

}

export const testing = (a,b,c,d) => {
  let data;
  axios.get("https://api.agify.io?name=bella").then(response => {
    if (response.status === 200) {
      console.log(response);
      data = response;
    }
  }).catch ((error) => {
    console.log(error.message);
  })
  return data;
}


export const calculateDistanceForRecommendation_copy = (weight, departure, destination, isFragile) => {
  const distance = {};
  const dep = new window.google.maps.LatLng(departure.lat, departure.lng);
  const des = new window.google.maps.LatLng(destination.lat, destination.lng);
  const center_0 = new window.google.maps.LatLng(dispatchCenter_1.lat, dispatchCenter_1.lng);
  const center_1 = new window.google.maps.LatLng(dispatchCenter_2.lat, dispatchCenter_2.lng);
  const center_2 = new window.google.maps.LatLng(dispatchCenter_3.lat, dispatchCenter_3.lng);
  const directionsService = new window.google.maps.DirectionsService();
  let recommendedData;
  const request_0 = {
    origin : center_0,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  const request_1 = {
    origin : center_1,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  const request_2 = {
    origin : center_2,
    destination : des,
    travelMode: 'DRIVING',
    waypoints : [{location : dep}]
  }
  distance.drone_distance_0 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_1.lat, dispatchCenter_1.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_1 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_2.lat, dispatchCenter_2.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_2 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(dispatchCenter_3.lat, dispatchCenter_3.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*metersToMiles;
  distance.drone_distance_des = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(departure.lat, departure.lng),  new window.google.maps.LatLng(destination.lat, destination.lng))*metersToMiles;
  axios.get("https://api.agify.io?name=bella")
    .then((response) => {
      if (response.status === 200) {
        directionsService.route(request_0,
          (respose, status) => {
            if (status === "OK") {
              const distanceObj =  respose['routes'][0]['legs'];
              distance.robot_distance_0 = distanceObj[0]['distance']['value']*metersToMiles;
              distance.robot_distance_des = distanceObj[1]['distance']['value']*metersToMiles;
            } else {
              console.log("Fail to get dispatch Center 0 distance", status);
            }
          }
        )
      }
      return axios.get("https://api.agify.io?name=bella");
    })
    .then((response) => {
      if (response.status === 200) {
        directionsService.route(request_1,
          (respose, status) => {
            if (status === "OK") {
              const distanceObj =  respose['routes'][0]['legs'];
              distance.robot_distance_1 = distanceObj[0]['distance']['value']*metersToMiles;
            } else {
              console.log("Fail to get dispatch Center 1 distance", status);
            }
          }
        )
      }
      return axios.get("https://api.agify.io?name=bella");
    })
    .then((response) => {
      if (response.status === 200) {
        directionsService.route(request_2,
          (respose, status) => {
            if (status === "OK") {
              const distanceObj =  respose['routes'][0]['legs'];
              distance.robot_distance_2 = distanceObj[0]['distance']['value']*metersToMiles;
            } else {
              console.log("Fail to get dispatch Center 2 distance", status);
            }
          }
        )
      }
      return axios.get("https://api.agify.io?name=bella");
    })
    .then((response) => {
      if (response.status === 200) {
        directionsService.route(request_2,
          (respose, status) => {
            if (status === "OK") {
              const distanceObj =  respose['routes'][0]['legs'];
              distance.robot_distance_2 = distanceObj[0]['distance']['value']*metersToMiles;
            } else {
              console.log("Fail to get dispatch Center 2 distance", status);
            }
          }
        )
      }
      return axios.get("https://api.agify.io?name=bella");
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(distance);
        const opt = {
          method: 'get',
          url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone_distance_0}&drone_distance_1=${distance.drone_distance_1}&drone_distance_2=${distance.drone_distance_2}&drone_distance_des=${distance.drone_distance_des}` + 
          `&robot_distance_0=${distance.robot_distance_0}&robot_distance_1=${distance.robot_distance_1}&robot_distance_2=${distance.robot_distance_2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${isFragile}`,
          headers: {
            "Content-Type": "application/json"
          }
        }
        axios(opt)
          .then((res) => {
              if (res.status === 200) {
                  const { responseData } = res;
                  recommendedData = responseData;
              }
          })
          .catch((err) => {
              console.log("recommendation failed: ", err.message);
              message.error("Recommendation failed! ");
          });
      }
    }).catch ((error) => {
      console.log(error.message);
    })
  return recommendedData;
}