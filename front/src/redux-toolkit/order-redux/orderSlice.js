import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_order } from "../../apiConfig/ApiConfig";


const initialState = {
    orderItem: null,
    listOfOrderItems: null,
    error: null,
    msg: null,
    loading: false,
    price: null
}

const orderSlice = createSlice({
    name : 'order',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(addToOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(addToOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getAllOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.listOfOrderItems = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getOrderPrice.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.price = action.payload;
            })
            .addCase(getOrderPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeOrderItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeOrderItem.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(removeOrderItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
       }
})

export default orderSlice.reducer;


export const addToOrder = createAsyncThunk(
    'order/addToOrder', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_order.post(`/ord/add`);
            console.log("data of add to order:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_order.get(`/ord/getAll`);
            console.log("data of get all order:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getOrderPrice = createAsyncThunk(
    'order/getOrderPrice', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_order.get(`/ord/getPrice`);
            console.log("get order price data:",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const removeOrderItem = createAsyncThunk(
    'order/removeOrderItem', // action type prefix
    async (id, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_order.delete(`/ord/delete/${id}`);
            console.log("remove order data:",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);