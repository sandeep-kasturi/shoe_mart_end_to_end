import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_addrs } from "../../apiConfig/ApiConfig";

const initialState = {
    address: null,
    listOfAddress:null,
    error: null,
    msg: null,
    loading: false
}

const addressSlice = createSlice({
    name : 'address',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(addToAddresss.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToAddresss.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(addToAddresss.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getAllAddresses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.listOfAddress = action.payload;
            })
            .addCase(getAllAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getAddressById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAddressById.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(getAddressById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
       }
})

export default addressSlice.reducer;


export const addToAddresss = createAsyncThunk(
    'address/addToAddresss', // action type prefix
    async (values, { rejectWithValue }) => { // payload creator
        try {
            const data = await api_addrs.post(`/addrs/add`,values);
            console.log("add addrs data from action.js",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getAllAddresses = createAsyncThunk(
    'address/getAllAddresses', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_addrs.get(`/addrs/getAll`);
            console.log("get addrs data from action.js",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getAddressById = createAsyncThunk(
    'address/getAddressById', // action type prefix
    async (id, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_addrs.get(`/addrs/getById/${id}`); 
            console.log("get addrs data from action.js",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);