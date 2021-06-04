import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_API_KEY } from './constants';
import { axios } from 'axios';
import { TOKEN_KEY } from  './constants';

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