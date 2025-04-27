import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:2828';

export const listItems = () => {
    return axios.get(REST_API_BASE_URL+'/items');
}

export const register = (username, email, password) => {
    return axios.post(REST_API_BASE_URL+'/register', {"username": username, "email": email, "password": password});
}

export const login = (username, password) => {
    return axios.post(REST_API_BASE_URL+'/login',{"username": username, "password": password});
}

export const getCart = (userId) => {
    return axios.get(`${REST_API_BASE_URL}/customers/cart/${userId}`);
  };
  
  
  export const addCart = (userId, itemId, qty) => {
    return axios.post(`${REST_API_BASE_URL}/customers/${userId}/cart/add/${itemId}/quantity/${qty}`);
  };
  
  
  export const removeCart = (userId, itemId) => {
    return axios.delete(`${REST_API_BASE_URL}/customers/cart/${userId}/delete/item/${itemId}`);
  };
  