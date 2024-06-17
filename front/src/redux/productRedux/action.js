import axios from "axios";

export const getProductById = (id) => async(dispatch) => {
        dispatch({type:"GET_PRODUCT_BY_ID_REQUEST"})
    try {
        const {data} = await axios.get(`http://localhost:8085/prd/product/${id}`);
        dispatch({type:'GET_PRODUCT_BY_ID_SUCCESS',payload:data});
        console.log("product data :", data);
    } catch (error) {
        dispatch({type:"GET_PRODUCT_BY_ID_FAILURE",payload:error.message});
    }
}