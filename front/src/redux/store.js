import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./userRedux/Reducers";
import productReducer from "./productRedux/Reducers";
import cartReducer from "./cartRedux/Reducers";
import addressReducer from "./addressRedux/Reducers";
import orderReducer from "./orderRedux/Reducers";


const rootReducers = combineReducers({
    user: userReducer,
    prd: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
})

// export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))