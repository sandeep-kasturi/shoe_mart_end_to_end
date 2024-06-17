import { api_order } from "../../apiConfig/ApiConfig";

export const addToOrder = () => async(dispatch) => {
    dispatch({type:'ADD_TO_ORDER_REQUEST'})
    try {
        const {data} = await api_order.post(`/ord/add`);
        console.log("data of add to cart:", data);
        dispatch({type:'ADD_TO_ORDER_SUCCESS', payload:data});
    } catch (error) {
        console.log("error of add to cart:", error.message);
        dispatch({type:'ADD_TO_ORDER_FAILURE', payload:error.message});
    }
}

export const getAllOrder = () => async(dispatch) =>  {
    console.log("getOrder price clicked in actoin.js")
    dispatch({type:'GET_ORDER_REQUEST'})
    try {
        const {data} = await api_order.get(`/ord/getAll`);
        console.log("data of get all order:", data);
        dispatch({type:'GET_ORDER_SUCCESS', payload:data});
    } catch (error) {
        dispatch({type:'GET_ORDER_FAILURE', payload:error.message});
    }
}

export const getOrderPrice = () => async(dispatch) => {
    console.log("getOrder price clicked in actoin.js")
    dispatch({type:'GET_ORDER_PRICE_REQUEST'})
    try {
        const {data} = await api_order.get(`/ord/getPrice`);
        console.log("get order price data:",data);
        dispatch({type:'GET_ORDER_PRICE_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'GET_ORDER_PRICE_FAILURE',payload:error.message})
    }
}

// export const getAllOrder = createAsyncThunk( // Use createAsyncThunk for Thunk
//   'orders/getAll',
//   async () => {
//     try {
//       const response = await api_order.get('/ord/getAll');
//       return response.data; // Replace with your expected data format
//     } catch (error) {
//       throw error; // Rethrow for error handling in reducers
//     }
//   }
// );


export const removeOrderItem = (id) => async(dispatch) => {
    dispatch({type:'REMOVE_ORDER_REQUEST'})
    try {
        console.log("id in remove cart item:", id);
        const {data} = await api_order.delete(`/cart/delete/${id}`);
        console.log("remove cart data:",data);
        dispatch({type:'REMOVE_ORDER_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'REMOVE_ORDER_FAILURE',payload:error.message})
    }
}