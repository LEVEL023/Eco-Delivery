import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_API_KEY, CENTER_1_LAT_LNG, CENTER_2_LAT_LNG, CENTER_3_LAT_LNG, METER_TO_MILES } from './constants';
import  axios  from 'axios';
import { BASE_URL, TOKEN_KEY, NAME_KEY, ID_KEY } from  './constants';
import { message } from 'antd';


let authHeader = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
}

const noAuthHeader = {
  "Content-Type": "application/json",
}

export const mapLoader = () => {
    const loader = new Loader({
      apiKey: GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ['drawing', 'places'],
    });
    return loader.load()
}
export const postRegister = (formData) => {
  const opt = {
    method: 'post',
    url: `${BASE_URL}/account/register`,
    data: {
        ...formData,
        credits: '300',
    },
    headers: { 
      ...noAuthHeader
    }
  }
  return axios(opt)
}
export const postLogin = (formData) => {
  const opt = {
    method: 'post',
    url: `${BASE_URL}/account/login`,
    data: {
      ...formData,
    },
    headers: { 
      ...noAuthHeader
    }
  }
  return axios(opt)
}
export const getCenters = () => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/dispatch_center`,
    headers: {
      ...authHeader
    }
  }
  return axios(opt)
}
export const getOrderDetails = (orderid) => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_order_detail/${orderid}`,
    headers: {
      ...authHeader
    }
  };
  return axios(opt)
}
export const cancelOrder = () => {
  const opt = {
    method: 'post',
    url: '',
    headers: {
      ...authHeader
    }
  }
  return axios(opt)
}
export const placeOrder = (formData) => {
  const opt = {
    method: 'post',
    url: `${BASE_URL}/order/place_order`,
    data: {
      ...formData
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    }
  }
  return axios(opt)
}
export const getAllOrder = (userid) => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_orders/${userid}`,
    headers: {
      ...authHeader
    }
  }
  return axios(opt)
}
export const getRecommendation = async (weight, departure, destination, isFragile) => {
  const distance = {};
  console.log('departure')
  console.log(departure)
  const dep = new window.google.maps.LatLng(departure.lat, departure.lng);
  const des = new window.google.maps.LatLng(destination.lat, destination.lng);
  const center_0 = new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng);
  const center_1 = new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng);
  const center_2 = new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng);
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
  distance.drone_distance_0 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_1 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_2 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_des = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(departure.lat, departure.lng),  new window.google.maps.LatLng(destination.lat, destination.lng))*METER_TO_MILES;
  const response = await axios.get("https://api.agify.io?name=bella");
  if (response.status === 200) {
    directionsService.route(request_0,
      (respose, status) => {
        if (status === "OK") {
          const distanceObj = respose['routes'][0]['legs'];
          distance.robot_distance_0 = distanceObj[0]['distance']['value'] * METER_TO_MILES;
          distance.robot_distance_des = distanceObj[1]['distance']['value'] * METER_TO_MILES;
        } else {
          console.log("Fail to get dispatch Center 0 distance", status);
        }
      }
    );
  }
  const response_1 = await axios.get("https://api.agify.io?name=bella");
  if (response_1.status === 200) {
    directionsService.route(request_1,
      (respose_1, status_1) => {
        if (status_1 === "OK") {
          const distanceObj_1 = respose_1['routes'][0]['legs'];
          distance.robot_distance_1 = distanceObj_1[0]['distance']['value'] * METER_TO_MILES;
        } else {
          console.log("Fail to get dispatch Center 1 distance", status_1);
        }
      }
    );
  }
  const response_2 = await axios.get("https://api.agify.io?name=bella");
  if (response_2.status === 200) {
    directionsService.route(request_2,
      (respose_2, status_2) => {
        if (status_2 === "OK") {
          const distanceObj_2 = respose_2['routes'][0]['legs'];
          distance.robot_distance_2 = distanceObj_2[0]['distance']['value'] * METER_TO_MILES;
        } else {
          console.log("Fail to get dispatch Center 2 distance", status_2);
        }
      }
    );
  }
  const response_3 = await axios.get("https://api.agify.io?name=bella");
  if (response_3.status === 200) {
    directionsService.route(request_2,
      (respose_3, status_3) => {
        if (status_3 === "OK") {
          const distanceObj_3 = respose_3['routes'][0]['legs'];
          distance.robot_distance_2 = distanceObj_3[0]['distance']['value'] * METER_TO_MILES;
        } else {
          console.log("Fail to get dispatch Center 2 distance", status_3);
        }
      }
    );
  }
  const response_4 = await axios.get("https://api.agify.io?name=bella");
  if (response_4.status === 200) {
    console.log(distance);
    const opt = {
      method: 'get',
      url: 'http://eco-spring-app.us-east-2.elasticbeanstalk.com/order/get_recommend?drone_distance_0=12.56&drone_distance_1=1.34&drone_distance_2=5.89&drone_distance_des=15.12&robot_distance_0=18.02&robot_distance_1=3.65&robot_distance_2=7.51&robot_distance_des=20.27&weight=5&is_fragile=true',
      // url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone_distance_0}&drone_distance_1=${distance.drone_distance_1}&drone_distance_2=${distance.drone_distance_2}&drone_distance_des=${distance.drone_distance_des}` +
      //   `&robot_distance_0=${distance.robot_distance_0}&robot_distance_1=${distance.robot_distance_1}&robot_distance_2=${distance.robot_distance_2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${isFragile}`,
      headers: {
        ...authHeader
      }
    };
    // console.log(opt.url)
    return axios(opt);
  }
}
export const getAccountInfo = (userId) => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/account/get_info/${userId}`,
    headers: {
      ...authHeader
    }
  }
  return axios(opt);
}
// Prepare recommendation api parameters
export const calculateDistanceForRecommendation = (weight, departure, destination, isFragile) => {
  const distance = {};
  const dep = new window.google.maps.LatLng(departure.lat, departure.lng);
  const des = new window.google.maps.LatLng(destination.lat, destination.lng);
  const center_0 = new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng);
  const center_1 = new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng);
  const center_2 = new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng);
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
        distance.robot_distance_0 = distanceObj[0]['distance']['value']*METER_TO_MILES;
        distance.robot_distance_des = distanceObj[1]['distance']['value']*METER_TO_MILES;
      } else {
        console.log("Fail to get dispatch Center 0 distance", status);
      }
    }
  )
  directionsService.route(request_1,
    (respose, status) => {
      if (status === "OK") {
        const distanceObj =  respose['routes'][0]['legs'];
        distance.robot_distance_1 = distanceObj[0]['distance']['value']*METER_TO_MILES;
      } else {
        console.log("Fail to get dispatch Center 1 distance", status);
      }
    }
  )
  directionsService.route(request_2,
    (respose, status) => {
      if (status === "OK") {
        const distanceObj =  respose['routes'][0]['legs'];
        distance.robot_distance_2 = distanceObj[0]['distance']['value']*METER_TO_MILES;
      } else {
        console.log("Fail to get dispatch Center 2 distance", status);
      }
    }
  )
  distance.drone_distance_0 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_1_LAT_LNG.lat, CENTER_1_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_1 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_2_LAT_LNG.lat, CENTER_2_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_2 = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(CENTER_3_LAT_LNG.lat, CENTER_3_LAT_LNG.lng),  new window.google.maps.LatLng(departure.lat, departure.lng))*METER_TO_MILES;
  distance.drone_distance_des = window.google.maps.geometry.spherical
  .computeDistanceBetween( new window.google.maps.LatLng(departure.lat, departure.lng),  new window.google.maps.LatLng(destination.lat, destination.lng))*METER_TO_MILES;
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
            const { data } = res;
            recommendedData = data;
            console.log(recommendedData);
        }
    })
    .catch((err) => {
        console.log("recommendation failed: ", err.message);
        message.error("Recommendation failed! ");
    });
  return recommendedData;
}
export const getRecommendation_deleteornot = (weight, departure, destination, isFragile) => {
  const distance = calculateDistanceForRecommendation(departure, destination);
  const opt = {
    method: 'get',
    url: `${BASE_URL}/order/get_recommend?drone_distance_0=${distance.drone_distance_0}&drone_distance_1=${distance.drone_distance_1}$drone_distance_2=${distance.drone_distance_2}&drone_distance_des=${distance.drone_distance_des}` + 
    `&robot_distance_0=${distance.robot_distance_0}&robot_distance_1=${distance.robot_distance_1}&robot_distance_2=${distance.robot_distance_2}&robot_distance_des=${distance.robot_distance_des}&weight=${weight}&is_fragile=${isFragile}`,
    headers: {
      "Content-Type": "application/json"
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