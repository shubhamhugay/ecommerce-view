import axios from "axios";

const BASE_URL = "http://localhost:8080";


const registerUser = (userData) => {

  return axios.post(
    `${BASE_URL}/register`,
    userData
  );
};


const loginUser = (credentials) => {

  return axios.post(
    `${BASE_URL}/authenticate`,
    credentials
  );
};


const getCurrentUser = (token) => {

  return axios.get(
    `${BASE_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export {
    getCurrentUser, loginUser, registerUser
};
