import { AuthAction } from "./action";

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
  quote: [],
  isOnline: false,
  pageHeader: "",
  transactionAdded: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthAction.SET_PAGE_HEADER:
      return { ...state, pageHeader: action.payload };
    case AuthAction.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case AuthAction.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case AuthAction.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AuthAction.CLEAR_ERROR:
      return { ...state, error: null };
    case AuthAction.LOGOUT:
      return { ...state, token: null, user: null };
    case AuthAction.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    case AuthAction.FETCH_USER_PROFILE_FAILURE:
      return { ...state, error: action.payload };
    case AuthAction.FETCH_QUOTE_SUCCESS:
      return { ...state, quote: action.payload };
    case AuthAction.FETCH_QUOTE_FAILURE:
      return { ...state, error: action.payload };
    case AuthAction.SET_ONLINE_STATUS:
      return { ...state, isOnline: action.payload };
    case AuthAction.ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionAdded: true,
      };
    case AuthAction.ADD_TRANSACTION_FAILURE:
      return {
        ...state,
        transactionAdded: false,
        error: action.payload,
      };
    case AuthAction.CLEAR_TRANSACTION_ADDED:
      return {
        ...state,
        transactionAdded: false,
      };
    default:
      return state;
  }
};

export default authReducer;
