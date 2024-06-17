import axios from "axios";
import { API_BASE_URL, api, api_user } from "../../apiConfig/ApiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const register = (signobj) => async(dispatch) => {
    dispatch({type:"USER_SIGNUP_REQUEST"});
    try {
        
        const data = await axios.post(`http://localhost:8083/auth/signup`,signobj);
        dispatch({type:'USER_SIGNUP_SUCCESS', payload:data})   
        console.log("data from action.js",data);
        alert('signup successful');
        // window.location.href='/login'; 
         
    } catch (error) {
        dispatch({type:'USER_SIGNUP_FAILURE', payload:error.message})
        console.log("error from action.js",error);
    }
}

export const reset = (email) => async(dispatch) => {
    dispatch({type:"PASSWD_RESET_LINK_REQUEST"});
    try {
        const emailObj = { email: email.trim() };
        const data = await axios.post(`http://localhost:8083/auth/resetPassword`,emailObj);
        dispatch({type:'PASSWD_RESET_LINK_SUCCESS', payload:data})   
        console.log("data from action.js",data);
        alert('reset verification link sent to your mail address');
    } catch (error) {
        dispatch({type:'PASSWD_RESET_LINK_FAILURE', payload:error.message})
        console.log("error from action.js",error);
    }
}

export const confirmReset = (token,obj) => async(dispatch) => {
    dispatch({type:"PASSWORD_REQUEST"});
    try {
        // const combineObj = { ...obj, token};
        console.log("obj:",obj, "token:",token);
        const data = await axios.post(`http://localhost:8083/auth/confirmReset?token=${token}`,obj);
        dispatch({type:'PASSWORD_SUCCESS', payload:data})   
        console.log("data from action.js",data);
        alert('password reset successful');
        window.location.href='/login'; 
    } catch (error) {
        dispatch({type:'PASSWORD_FAILURE', payload:error.message})
        console.log("error from action.js",error);
        alert('password reset unsuccessful, please try again');
        window.location.href='/resetPassword'; 
    }
}

export const login = (obj) => async(dispatch) => {
    dispatch({type:"USER_LOGIN_REQUEST"});
    try {
        console.log("login obj:",obj);
        const {data} = await axios.post(`http://localhost:8083/auth/login`,obj);
        dispatch({type:'USER_LOGIN_SUCCESS', payload:data})   
        console.log("data from action.js",data);
        localStorage.setItem('jwt',data.accessToken.trim());
        alert('user login successful');
        // window.location.href='/';
    } catch (error) {
        dispatch({type:'USER_LOGIN_FAILURE', payload:error.message})
        console.log("error from action.js",error);
        alert('login failed, please try again');
    }
}


// export const login = createAsyncThunk(
//     'users/fetch',
//     async () => {
//       const response = await fetch('https://api.example.com/users');
//       const data = await response.json();
//       return data;
//     }
//   );


export const logout = () => async(dispatch) => {

        await dispatch({type: 'LOGOUT'})
        localStorage.removeItem('jwt');
        alert('logout successful');

}

export const getUserByJwt = () => async(dispatch) => {
    dispatch({type:"GETUSER_REQUEST"});
    try {
        const {data} = await api_user.get(`/usr/profile`);
        dispatch({type:"GETUSER_SUCCESS",payload:data});
        console.log("get user data in action",data);
    } catch (error) {
        dispatch({type:"GETUSER_FAILURE",payload:error.message});
        console.log(error.message);
    }
}

