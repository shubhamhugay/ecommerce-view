import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getAllProducts = () => {

  return axios.get(
    `${BASE_URL}/products`
  );
};


const getProductById = (id) => {

  return axios.get(
    `${BASE_URL}/products/${id}`
  );
};


export {
    getAllProducts,
    getProductById
};
