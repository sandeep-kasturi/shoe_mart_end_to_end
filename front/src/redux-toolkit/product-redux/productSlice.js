import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: null,
    listOfProducts: null,
    error: null,
    msg: null,
    loading: false
}

const productSlice = createSlice({
    name : 'product',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.listOfProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;



export const getProductById = createAsyncThunk(
    'product/getProductById', // action type prefix
    async (id, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await axios.get(`http://localhost:8085/prd/product/${id}`);
            console.log("getProductById data :", data);
            return data;
        } catch (error) {
            console.log("error in getById", error);
            alert(`${error.response.data}`)
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await axios.get(`http://localhost:8085/prd/product/getAll`);
            console.log("getAllProducts data :", data);
            return data;
        } catch (error) {
            console.log("error data in getAllProducts:",error)
            alert(`${error.response.data}`);
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);