import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
} from "./action";

const initialState = {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user,
            };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT:
            return { ...state, token: null, user: null };
        case FETCH_USER_PROFILE_SUCCESS:
            return { ...state, user: action.payload };
        case FETCH_USER_PROFILE_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
