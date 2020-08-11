import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS: //BOTH of register and login return a token and once there is a one returning from a function it will goes into the same process
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                    isAuthenticated: true,
                    loading: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: action.payload // If we fail the payload will include the error message that comes from the backend request 

            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

                case USER_LOADED:
                    return {
                        ...state,
                        isAuthenticated: true,
                            loading: false,
                            user: action.payload
                    };





                default:
                    return state;
    }
}