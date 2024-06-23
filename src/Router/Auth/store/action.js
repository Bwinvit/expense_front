import { AuthService } from "../../../api/APIs/auth";
import { NAQService } from "../../../api/APIs/naq";

export const SET_PAGE_HEADER = "SET_PAGE_HEADER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOGOUT = "LOGOUT";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_FAILURE = "FETCH_USER_PROFILE_FAILURE";
export const FETCH_QUOTE_SUCCESS = "FETCH_QUOTE_SUCCESS";
export const FETCH_QUOTE_FAILURE = "FETCH_QUOTE_FAILURE";
export const SET_ONLINE_STATUS = "SET_ONLINE_STATUS";

export const setPageHeader = (header) => ({
  type: SET_PAGE_HEADER,
  payload: header,
});

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await AuthService.postLogin({ email, password });
    const { token, user } = response;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.error });
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
    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response });
  } catch (error) {
    logout();
    dispatch({
      type: FETCH_USER_PROFILE_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const getQuote = () => async (dispatch) => {
  try {
    const response = await NAQService.getQuote();
    dispatch({ type: FETCH_QUOTE_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_QUOTE_FAILURE, payload: error.message });
  }
};

export const setOnlineStatus = (isOnline) => ({
  type: SET_ONLINE_STATUS,
  payload: isOnline,
});
