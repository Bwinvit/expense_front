import { CommonAction } from "./action";

const initialState = {
  loading: false,
  transactionData: {
    date: "",
    categoryId: "",
    amount: "",
    description: "",
  },
  transactionType: {
    data: [],
    error: null,
    loading: true,
  },
  category: {
    data: [],
    error: null,
    loading: true,
  },
  categoryTree: [],
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CommonAction.FETCH_TRANSACTION_TYPE_SUCCESS:
      return {
        ...state,
        transactionType: { data: action.payload, error: null, loading: false },
      };
    case CommonAction.FETCH_TRANSACTION_TYPE_FAILURE:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          error: action.payload,
          loading: false,
        },
      };
    case CommonAction.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        category: { data: action.payload, error: null, loading: false },
      };
    case CommonAction.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        category: {
          ...state.category,
          error: action.payload,
          loading: false,
        },
      };
    case CommonAction.MIGRATE_TRANSACTION_TYPE_TREE:
      return {
        ...state,
        categoryTree: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
