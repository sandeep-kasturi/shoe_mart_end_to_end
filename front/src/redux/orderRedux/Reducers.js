const initialState = {
    orderItem: null,
    listOfOrderItems: null,
    error: null,
    msg: null,
    loading: false,
    price: null
}



const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER_REQUEST':
            return {...state, loading: true}
        case 'ADD_TO_ORDER_SUCCESS':
            return {...state, msg: action.payload, loading: false}      
        case 'ADD_TO_ORDER_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'GET_ORDER_REQUEST':
            return {...state, loading: true}
        case 'GET_ORDER_SUCCESS':
            return {...state, loading: false, listOfOrderItems: action.payload}
        case 'GET_ORDER_FAILURE':
            return {...state, loading: false, error: action.payload}
        case 'REMOVE_ORDER_REQUEST':
            return {...state, loading: true}
        case 'REMOVE_ORDER_SUCCESS':
            return {...state, loading: false, msg: action.payload}
        case 'REMOVE_ORDER_FAILURE':
            return {...state, loading: false, error: action.payload}
        case 'GET_ORDER_PRICE_REQUEST':
            return {...state, loading: true}
        case 'GET_ORDER_PRICE_SUCCESS':
            return {...state, loading: false, price: action.payload}
        case 'GET_ORDER_PRICE_FAILURE':
            return {...state, loading: false, error: action.payload}    
        default:
            return initialState;
    }
}

export default orderReducer;