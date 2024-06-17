const initialState = {
    address: null,
    listOfAddress:null,
    error: null,
    msg: null,
    loading: false
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_ADDRESS_REQUEST':
            return {...state, loading: true}
        case 'ADD_TO_ADDRESS_SUCCESS':
            return {...state, msg: action.payload, loading: false}      
        case 'ADD_TO_ADDRESS_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'GET_ADDRESS_REQUEST':
            return {...state, loading: true}
        case 'GET_ADDRESS_SUCCESS':
            return {...state, loading: false, listOfAddress: action.payload}
        case 'GET_ADDRESS_FAILURE':
            return {...state, loading: false, error: action.payload}
        case 'GET_ADDRESS_BY_ID_REQUEST':
            return {...state, loading: true}
        case 'GET_ADDRESS_BY_ID_SUCCESS':
            return {...state, loading: false, address: action.payload}
        case 'GET_ADDRESS_BY_ID_FAILURE':
            return {...state, loading: false, error: action.payload}
        default:
            return initialState;
    }
}

export default addressReducer;