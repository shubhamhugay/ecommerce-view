import axios from "axios";

const BASE_URL = "http://localhost:8080";


const getAllProducts = (
  keyword,
  page,
  size
) => {

  return axios.get(
    `${BASE_URL}/products`,
    {
      params: {
        keyword: keyword,
        page: page,
        size: size,
      },
    }
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
