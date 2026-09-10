import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getMyOrders = (token) => {

  return axios.get(
    `${BASE_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const getOrderById = (
  orderId,
  token
) => {

  return axios.get(
    `${BASE_URL}/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export {
    getMyOrders,
    getOrderById
};
