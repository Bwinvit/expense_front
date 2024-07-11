import { transactionAction } from "./action";
import _ from "lodash";

const initialState = {
  isTransactionsLoading: false,
  transactionData: [],
  transactionPayload: {
    date: "",
    categoryId: "",
    amount: "",
    description: "",
  },
  filter: {
    start: "",
    end: "",
    category: "",
  },
  isVisibleDeleteModal: false,
  transactionInAction: "",
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case transactionAction.GET_TRANSACTIONS:
      return { ...state, isTransactionsLoading: true };
    case transactionAction.SET_TRANSACTIONS:
      return {
        ...state,
        isTransactionsLoading: false,
        transactionData: action.payload,
      };
    case transactionAction.CHANGE_DATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          start: action.payload.start,
          end: action.payload.end,
        },
      };
    case transactionAction.CHANGE_CATEGORY:
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload,
        },
      };
    case transactionAction.REGISTER_TRANSACTION_IN_ACTION:
      return {
        ...state,
        transactionInAction: action.payload,
      };
    case transactionAction.CHANGE_STATE_MODAL_DELETE:
      return {
        ...state,
        isVisibleDeleteModal: !state.isVisibleDeleteModal,
      };
    case transactionAction.CLEAR_TRANSACTION_DATA:
      return {
        ...state,
        transactionPayload: initialState.transactionPayload,
      };
    case transactionAction.CHANGE_TRANSACTION_DATA_DATE:
      return {
        ...state,
        transactionPayload: {
          ...state.transactionPayload,
          date: action.payload,
        },
      };
    case transactionAction.CHANGE_TRANSACTION_DATA_CATEGORY:
      return {
        ...state,
        transactionPayload: {
          ...state.transactionPayload,
          categoryId: action.payload,
        },
      };
    case transactionAction.CHANGE_TRANSACTION_DATA_AMOUNT:
      return {
        ...state,
        transactionPayload: {
          ...state.transactionPayload,
          amount: action.payload,
        },
      };
    case transactionAction.CHANGE_TRANSACTION_DATA_DESCRIPTION:
      return {
        ...state,
        transactionPayload: {
          ...state.transactionPayload,
          description: action.payload,
        },
      };
    default:
      return state;
  }
};

export default transactionReducer;
