import axios from "axios";

const BASE_URL = "http://localhost:8080";


const createCheckout = (token) => {

  return axios.post(
    `${BASE_URL}/checkout/create`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const verifyPayment = (
  paymentData,
  token
) => {

  return axios.post(
    `${BASE_URL}/checkout/verify`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export {
    createCheckout,
    verifyPayment
};
