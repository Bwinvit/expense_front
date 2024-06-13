import { AuthService } from "../../../api/APIs/auth";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_FAILURE = "FETCH_USER_PROFILE_FAILURE";

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await AuthService.postLogin({ email, password });
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { type: LOGOUT };
};

export const fetchUserProfile = () => async (dispatch) => {
    try {
        const response = await AuthService.getProfile();
        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
    }
};
