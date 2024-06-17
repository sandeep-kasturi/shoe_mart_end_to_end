import axios from "axios";
import { api_cart } from "../../apiConfig/ApiConfig";

export const addToCart = (id) => async(dispatch) => {
    dispatch({type:'ADD_TO_CART_REQUEST'})
    try {
        const {data} = await api_cart.post(`/cart/add`,id);
        console.log("data of add to cart:", data);
        dispatch({type:'ADD_TO_CART_SUCCESS', payload:data});
    } catch (error) {
        dispatch({type:'ADD_TO_CART_FAILURE', payload:error.message});
    }
}

export const getCart = () => async(dispatch) =>  {
    dispatch({type:'GET_CART_REQUEST'})
    try {
        const {data} = await api_cart.get(`/cart/getAll`);
        console.log("data of get cart:", data);
        dispatch({type:'GET_CART_SUCCESS', payload:data});
    } catch (error) {
        dispatch({type:'GET_CART_FAILURE', payload:error.message});
    }
}

export const getCartPrice = () => async(dispatch) => {
    dispatch({type:'GET_CART_PRICE_REQUEST'})
    try {
        const {data} = await api_cart.get(`/cart/getPrice`);
        console.log("get cat price data:",data);
        dispatch({type:'GET_CART_PRICE_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'GET_CART_PRICE_FAILURE',payload:error.message})
    }
}

export const removeCartItem = (id) => async(dispatch) => {
    dispatch({type:'REMOVE_CART_REQUEST'})
    try {
        console.log("id in remove cart item:", id);
        const {data} = await api_cart.delete(`/cart/delete/${id}`);
        console.log("remove cart data:",data);
        dispatch({type:'REMOVE_CART_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'REMOVE_CART_FAILURE',payload:error.message})
    }
}