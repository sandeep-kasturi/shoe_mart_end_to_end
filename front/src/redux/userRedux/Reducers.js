const initialState = {
    user: null,
    error: null,
    jwt: null,
    refreshToken: null,
    msg: null,
    loading: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {...state, loading: true}
        case 'USER_LOGIN_SUCCESS':
            return {...state, loading: false, jwt: action.payload.accessToken, refreshToken: action.payload.refreshToken}      //chnage it when logged in
        case 'USER_LOGIN_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'USER_SIGNUP_REQUEST':
            return {...state, loading: true}
        case 'USER_SIGNUP_SUCCESS':
            return {...state, msg: action.payload, loading: false}
        case 'USER_SIGNIN_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'PASSWD_RESET_LINK_REQUEST':
            return {...state, loading: true}
        case 'PASSWD_RESET_LINK_SUCCESS':
            return {...state, msg: action.payload, loading: false}
        case 'PASSWD_RESET_LINK_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'PASSWD_RESET_REQUEST':
            return {...state, loading: true}
        case 'PASSWD_RESET_SUCCESS':
            return {...state, msg: action.payload, loading: false}
        case 'PASSWD_RESET_FAILURE':
            return {...state, error: action.payload, loading: false}
        case 'GETUSER_REQUEST':
            return {...state, loading: true}
        case 'GETUSER_SUCCESS':
            return {...state, user: action.payload, loading: true}
        case 'GETUSER_FAILURE':
            return {...state, error: action.payload, loading: true}
        case 'LOGOUT':
            return initialState;
        default:
            return initialState;
    }
}

export default userReducer;