import {
  SET_PAGE_HEADER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR,
  LOGOUT,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAILURE,
  SET_ONLINE_STATUS,
} from "./action";

const initialState = {
  loading: false,
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  quote: [],
  isOnline: false,
  pageHeader: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_HEADER:
      return { ...state, pageHeader: action.payload };
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
    case CLEAR_ERROR:
      return { ...state, error: null };
    case LOGOUT:
      return { ...state, token: null, user: null };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    case FETCH_USER_PROFILE_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_QUOTE_SUCCESS:
      return { ...state, quote: action.payload };
    case FETCH_QUOTE_FAILURE:
      return { ...state, error: action.payload };
    case SET_ONLINE_STATUS:
      return { ...state, isOnline: action.payload };
    default:
      return state;
  }
};

export default authReducer;
