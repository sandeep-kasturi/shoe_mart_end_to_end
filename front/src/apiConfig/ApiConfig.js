import axios from "axios";

export const API_BASE_URL_USER = "http://localhost:8083";
export const API_BASE_URL_CART = "http://localhost:8084";
export const API_BASE_URL_ADDRESS = "http://localhost:8082";
export const API_BASE_URL_ORDER = "http://localhost:8086";
export const API_BASE_URL_PAYMENT = "http://localhost:8087";

const jwt = localStorage.getItem("jwt");

export const api_user = axios.create({
    baseURL: API_BASE_URL_USER,
    headers: {
        "Authorization":`Bearer ${jwt}`,
        'Content-Type': 'application/json',
        }
})

export const api_cart = axios.create({
    baseURL: API_BASE_URL_CART,
    headers: {
        "Authorization":`Bearer ${jwt}`,
        'Content-Type': 'application/json',
        }
})

export const api_addrs = axios.create({
    baseURL: API_BASE_URL_ADDRESS,
    headers: {
        "Authorization":`Bearer ${jwt}`,
        'Content-Type': 'application/json',
        }
})

export const api_order = axios.create({
    baseURL: API_BASE_URL_ORDER,
    headers: {
        "Authorization":`Bearer ${jwt}`,
        'Content-Type': 'application/json',
        }
})

export const api_payment = axios.create({
    baseURL: API_BASE_URL_PAYMENT,
    headers: {
        "Authorization":`Bearer ${jwt}`,
        'Content-Type': 'application/json',
        }
})