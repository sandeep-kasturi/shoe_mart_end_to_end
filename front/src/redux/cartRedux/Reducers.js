const initialState = {
    cartItem: null,
    listOfCartItems: null,
    error: null,
    msg: null,
    loading: false,
    price: null
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART_REQUEST':
            return {...state, loading: true}
        case 'ADD_TO_CART_SUCCESS':
            return {...state, product: action.payload, loading: false}      
        case 'ADD_TO_CART_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'GET_CART_REQUEST':
            return {...state, loading: true}
        case 'GET_CART_SUCCESS':
            return {...state, loading: true, listOfCartItems: action.payload}
        case 'GET_CART_FAILURE':
            return {...state, loading: false, error: action.payload}
        case 'GET_CART_PRICE_REQUEST':
            return {...state, loading: true}
        case 'GET_CART_PRICE_SUCCESS':
            return {...state, loading: false, price: action.payload}
        case 'GET_CART_PRICE_FAILURE':
            return {...state, loading: false, error: action.payload}
        case 'REMOVE_CART_REQUEST':
            return {...state, loading: true}
        case 'REMOVE_CART_SUCCESS':
            return {...state, loading: false, msg: action.payload}
        case 'REMOVE_CART_FAILURE':
            return {...state, loading: false, error: action.payload}
        default:
            return initialState;
    }
}

export default cartReducer;