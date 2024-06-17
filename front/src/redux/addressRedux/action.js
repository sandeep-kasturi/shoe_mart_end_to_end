import { api_addrs } from "../../apiConfig/ApiConfig";

export const addAddress = (values) => async(dispatch) => {
    dispatch({type:'ADD_TO_ADDRESS_REQUEST'})
    try {    
        const data = await api_addrs.post(`/addrs/add`,values);
        dispatch({type:'ADD_TO_ADDRESS_SUCCESS', payload:data})   
        console.log("add addrs data from action.js",data);
         
    } catch (error) {
        dispatch({type:'ADD_TO_ADDRESS_FAILURE', payload:error.message})
        console.log("error from action.js",error);
    }
}

export const getAllAddresses = () => async(dispatch) => {
    dispatch({type:'GET_ADDRESS_REQUEST'})
    try {    
        const {data} = await api_addrs.get(`/addrs/getAll`);
        dispatch({type:'GET_ADDRESS_SUCCESS', payload:data})   
        console.log("get addrs data from action.js",data);
         
    } catch (error) {
        dispatch({type:'GET_ADDRESS_FAILURE', payload:error.message})
        console.log("error from action.js",error);
    }
}

export const getAddressById = (id) => async(dispatch) => {
    dispatch({type:'GET_ADDRESS_BY_ID_REQUEST'})
    try {    
        const {data} = await api_addrs.get(`/addrs/getById/${id}`);
        dispatch({type:'GET_ADDRESS_BY_ID_SUCCESS', payload:data})   
        console.log("get addrs data from action.js",data);
         
    } catch (error) {
        dispatch({type:'GET_ADDRESS_BY_ID_FAILURE', payload:error.message})
        console.log("error from action.js",error);
    }
}