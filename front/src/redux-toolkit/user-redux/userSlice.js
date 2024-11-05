import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_user } from "../../apiConfig/ApiConfig";
import axios from "axios";

const initialState = {
    user: null,
    error: null,
    jwt: null,
    refreshToken: null,
    msg: null,
    loading: false
};

const userSlice = createSlice({
    name : 'user',
    initialState,



    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.accessToken;
                // state.refreshToken = action.payload.refreshToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserByJwt.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserByJwt.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserByJwt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(reset.pending, (state) => {
                state.loading = true;
            })
            .addCase(reset.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(reset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(confirmReset.pending, (state) => {
                state.loading = true;
            })
            .addCase(confirmReset.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(confirmReset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export default userSlice.reducer;


export const login = createAsyncThunk(
    'user/login', // action type prefix
    async (obj, { rejectWithValue }) => { // payload creator
        try {
            console.log("login obj:", obj);
            const { data } = await axios.post(`http://localhost:8083/auth/login`, obj);
            localStorage.setItem('jwt', data.accessToken);
            alert('user login successful');
            return data; // return the data as the payload
        } catch (error) {
            alert('login failed, please try again');
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getUserByJwt = createAsyncThunk('user/getUserByJwt', async (_, { rejectWithValue }) => {
        try {
            // console.log("api_user:",api_user);
            const {data} = await api_user.get(`/usr/profile`);
            console.log("get user data in action",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk('user,logout', async() => {
    localStorage.clear();
});

export const reset = createAsyncThunk('user/reset', async (email, { rejectWithValue }) => {
    try {
        const emailObj = { email: email.trim() };           //in backend we are handling this as a responseBody, so we have to pass this as obj not as a direct string
        const {data} = await axios.post(`http://localhost:8083/auth/resetPassword`,emailObj);   
        console.log("data from action.js",data);
        alert('reset verification link sent to your mail address');
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const confirmReset = createAsyncThunk('user/confirmReset', async (token, obj, { rejectWithValue }) => {
    try {
        console.log("obj:",obj, "token:",token);
        const {data} = await axios.post(`http://localhost:8083/auth/confirmReset?token=${token}`,obj);  
        console.log("data from action.js",data);
        alert('password reset successful');
        window.location.href='/login';
        return data;
    } catch (error) {
        console.log("error from action.js",error);
        alert('password reset unsuccessful, please try again');
        window.location.href='/resetPassword'; 
        return rejectWithValue(error.message);
    }
}
);