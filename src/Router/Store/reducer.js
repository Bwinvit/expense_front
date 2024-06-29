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
    case CommonAction.CLEAR_TRANSACTION_DATA:
      return {
        ...state,
        transactionData: initialState.transactionData,
      };
    case CommonAction.CHANGE_TRANSACTION_DATA_DATE:
      return {
        ...state,
        transactionData: {
          ...state.transactionData,
          date: action.payload,
        },
      };
    case CommonAction.CHANGE_TRANSACTION_DATA_CATEGORY:
      return {
        ...state,
        transactionData: {
          ...state.transactionData,
          categoryId: action.payload,
        },
      };
    case CommonAction.CHANGE_TRANSACTION_DATA_AMOUNT:
      return {
        ...state,
        transactionData: {
          ...state.transactionData,
          amount: action.payload,
        },
      };
    case CommonAction.CHANGE_TRANSACTION_DATA_DESCRIPTION:
      return {
        ...state,
        transactionData: {
          ...state.transactionData,
          description: action.payload,
        },
      };
    default:
      return state;
  }
};

export default commonReducer;
