import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api_cart } from "../../apiConfig/ApiConfig";
import { useNavigate } from "react-router-dom";

const initialState = {
    cartItem: null,
    listOfCartItems: null,
    error: null,
    msg: null,
    loading: false,
    price: null
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
                // useNavigate("/cart");
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.listOfCartItems = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(getCartPrice.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.price = action.payload;
            })
            .addCase(getCartPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
    }
})

export default cartSlice.reducer;


export const addToCart = createAsyncThunk(
    'cart/addToCart', // action type prefix
    async (id, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_cart.post(`/cart/add/${id}`);
            console.log("data of add to cart:", data);
            return data;
        } catch (error) {
            console.log("error in getById", error);
            alert(`${error.response.data}`)
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getCart = createAsyncThunk(
    'cart/getCart', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_cart.get(`/cart/getAll`);
            console.log("data of get cart:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const getCartPrice = createAsyncThunk(
    'cart/getCartPrice', // action type prefix
    async (_, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_cart.get(`/cart/getPrice`);
            console.log("get cat price data:",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem', // action type prefix
    async (id, { rejectWithValue }) => { // payload creator
        try {
            const {data} = await api_cart.delete(`/cart/delete/${id}`);
            console.log("remove cart data:",data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message); // return the error message using rejectWithValue
        }
    }
);

