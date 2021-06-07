import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_API_KEY } from './constants';
import { axios } from 'axios';
import { TOKEN_KEY } from  './constants';
import { BASE_URL } from './constants';

const userid = localStorage.getItem('dispatch_userid')

export const mapLoader = () => {
    const loader = new Loader({
      apiKey: GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ['drawing', 'places'],
    });
    console.log(loader)
    return loader.load()
}

export const getRecommendations = (formData) => {
  const opt = {
    method: 'get',
    url: `${BASE_URL}/recommend`,
    data: {
      ...formData // ??? what location data do you need: address? latlng?
    },
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
  };
  return axios(opt)
}
export const getCenters = () => {
  // should return latlng of three centers
  // [
  // {
  //   lat:,
  //   lng:,
  // },
  // {
  //   lat:,
  //   lng:,
  // },
  // {
  //   lat:,
  //   lng:,
  // }
  // ]
  const opt = {
    method: 'get',
    url: `${BASE_URL}/get_centers?userid=${userid}`,
    data: {},
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
  }
  return axios(opt)
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
  const opt = {
    method: 'get',
    url: `${BASE_URL}/get_order_detail/${orderid}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
  };
  return axios(opt)
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