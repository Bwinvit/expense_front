import { ManagementAction } from "./action";

const initialState = {
  transactionType: {
    data: [],
    error: null,
    loading: true,
    registedData: {},
    transactionTypePayload: {
      name: "",
      description: "",
    },
  },
  category: {
    data: [],
    error: null,
    loading: true,
    registedData: {},
    categoryPayload: {
      name: "",
      description: "",
      type: "",
    },
  },
  bill: {
    data: [],
    error: null,
    loading: true,
    registedData: {},
    billPayload: {
      categoryId: "",
      amount: "",
      description: "",
      dueDate: "",
      isRecurring: false,
      recurrencePeriod: "",
    },
  },
};

const manangeReducer = (state = initialState, action) => {
  switch (action.type) {
    //Transaction Type
    case ManagementAction.FETCH_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          data: action.payload,
          loading: false,
        },
      };
    case ManagementAction.REGISTER_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          registedData: action.payload,
          transactionTypePayload: {
            name: action.payload.name,
            description: action.payload.description,
          },
        },
      };
    case ManagementAction.CHANGE_TRANSACTION_TYPE_NAME:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          transactionTypePayload: {
            ...state.transactionType.transactionTypePayload,
            name: action.payload,
          },
        },
      };
    case ManagementAction.CHANGE_TRANSACTION_TYPE_DESCRIPTION:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          transactionTypePayload: {
            ...state.transactionType.transactionTypePayload,
            description: action.payload,
          },
        },
      };
    case ManagementAction.CLEAR_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: {
          ...state.transactionType,
          registedData: {},
          transactionTypePayload: {
            name: "",
            description: "",
          },
        },
      };
    //Category
    case ManagementAction.FETCH_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          data: action.payload,
          loading: false,
        },
      };
    case ManagementAction.REGISTER_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          registedData: action.payload,
          categoryPayload: {
            name: action.payload.name,
            description: action.payload.description,
            type: action.payload.type,
          },
        },
      };
    case ManagementAction.CHANGE_CATEGORY_NAME:
      return {
        ...state,
        category: {
          ...state.category,
          categoryPayload: {
            ...state.category.categoryPayload,
            name: action.payload,
          },
        },
      };
    case ManagementAction.CHANGE_CATEGORY_TYPE:
      return {
        ...state,
        category: {
          ...state.category,
          categoryPayload: {
            ...state.category.categoryPayload,
            type: action.payload,
          },
        },
      };
    case ManagementAction.CHANGE_CATEGORY_DESCRIPTION:
      return {
        ...state,
        category: {
          ...state.category,
          categoryPayload: {
            ...state.category.categoryPayload,
            description: action.payload,
          },
        },
      };
    case ManagementAction.CLEAR_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          registedData: {},
          categoryPayload: {
            name: "",
            description: "",
            type: "",
          },
        },
      };
    //Bill
    case ManagementAction.FETCH_BILL:
      return {
        ...state,
        bill: {
          ...state.bill,
          data: action.payload,
          loading: false,
        },
      };
    case ManagementAction.REGISTER_BILL:
      return {
        ...state,
        bill: {
          ...state.bill,
          registedData: action.payload,
        },
      };
    default:
      return state;
  }
};

export default manangeReducer;
