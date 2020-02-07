import {
    REGISTER_SUCCES,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERR,
    LOGIN_SUCCES,
    LOGIN_FAILED,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null,
    user: null
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCES:
        case LOGIN_SUCCES:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERR:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}