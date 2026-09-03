import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getCart = (token) => {

  return axios.get(
    `${BASE_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const addCartItem = (
  productId,
  quantity,
  token
) => {

  return axios.post(
    `${BASE_URL}/cart/items/${productId}`,
    null,
    {
      params: {
        quantity: quantity,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const updateCartItem = (
  productId,
  quantity,
  token
) => {

  return axios.put(
    `${BASE_URL}/cart/items/${productId}`,
    null,
    {
      params: {
        quantity: quantity,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const removeCartItem = (
  productId,
  token
) => {

  return axios.delete(
    `${BASE_URL}/cart/items/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


const clearCartItems = (token) => {

  return axios.delete(
    `${BASE_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartItems,
};