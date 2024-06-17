import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_payment } from "../../apiConfig/ApiConfig";

const initialState = {
    payment_link_url : null,
    payment_link_id : null,
    loading : false,
    message : null,
    status : null
};

const paymentSlice = createSlice({
    name : 'payment',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payment_link_url = action.payload.payment_link_url;
                state.payment_link_id = action.payload.payment_link_id;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default paymentSlice.reducer;


export const createPayment = createAsyncThunk(
    'payment/createPayment', // action type prefix
    async (addrsId, { rejectWithValue }) => { // payload creator
        try {
            const { data } = await api_payment.post(`/api/payments/${addrsId}`);
            console.log("create payment data:",data);
            if(data.payment_link_url){
                window.location.href=data.payment_link_url;
                }
            return data; // return the data as the payload
        } catch (error) {
            alert('login failed, please try again');
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payment/updatePayment', // action type prefix
    async (paymentId, { rejectWithValue }) => { // payload creator
        try {
            const { data } = await api_payment.get(`/api/payments?payment_id=${paymentId}`);
            console.log("update payment data:",data);
            return data; // return the data as the payload
        } catch (error) {
            alert('login failed, please try again');
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);


