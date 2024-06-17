const initialState = {
    product: null,
    listOfProducts: null,
    error: null,
    msg: null,
    loading: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_BY_ID_REQUEST':
            return {...state, loading: true}
        case 'GET_PRODUCT_BY_ID_SUCCESS':
            // console.log("product reducer:",action.payload);
            return {...state, product: action.payload, loading: false}      
        case 'GET_PRODUCT_BY_ID_FAILURE':
            return {...state, error: action.payload, loading: false}
        default:
            return initialState;
    }
}

export default productReducer;