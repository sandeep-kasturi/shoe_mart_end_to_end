import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-redux/userSlice";
import productSlice from "./product-redux/productSlice";
import cartSlice from "./cart-redux/cartSlice";
import addressSlice from "./address-redux/addressSlice";
import orderSlice from "./order-redux/orderSlice";

const store = configureStore({

    reducer : {
        userRedux : userSlice,
        productRedux : productSlice,
        cartRedux : cartSlice,
        addressRedux : addressSlice,
        orderRedux : orderSlice
    }



})

export default store;