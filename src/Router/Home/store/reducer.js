import { homeAction } from "./action";
import _ from "lodash";

const initialState = {
  isLoadingMonthlySum: false,
  monthlySumTransactionType: {},
  monthlySum: {},
  isLoadingExpenseBreakdown: false,
  expenseRawDate: {},
  expenseBreakdown: {},
  expenseBreakdownInUse: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case homeAction.STATE_HOME_DATA:
      if (_.isEmpty(state.monthlySum)) {
        return { ...state, isLoadingMonthlySum: true };
      } else {
        return { ...state, isLoadingMonthlySum: false };
      }
    case homeAction.FETCH_HOME_DATA:
      return { ...state, monthlySum: action.payload.totalsByType };
    case homeAction.STATE_EXPENSE_BREAKDOWN:
      if (_.isEmpty(state.expenseBreakdown)) {
        return { ...state, isLoadingExpenseBreakdown: true };
      } else {
        return { ...state, isLoadingExpenseBreakdown: false };
      }
    case homeAction.FETCH_EXPENSE_BREAKDOWN:
      return {
        ...state,
        expenseRawDate: action.payload.expenseRawDate,
        expenseBreakdown: action.payload.extractData,
        expenseBreakdownInUse: action.payload.extractData,
      };
    case homeAction.SET_TRANSACTION_TYPE_TITLE:
      return { ...state, monthlySumTransactionType: action.payload };
    case homeAction.CHANGE_TRANSACTION_TYPE_TITLE:
      const { transactionType, category, transaction } = action.payload;

      const updatedTransactionTypes = state.monthlySumTransactionType.map(
        (type) =>
          type.transactionType === transactionType
            ? { ...type, isSelected: !type.isSelected }
            : type
      );

      const selectedTransactionTypeNames = updatedTransactionTypes
        .filter((type) => type.isSelected)
        .map((type) => type.transactionType);
      const filteredType = _.filter(transaction, (type) => {
        return _.includes(selectedTransactionTypeNames, type.name);
      });
      const filteredCategory = _.filter(category, (cat) => {
        return _.some(filteredType, (filtered) => filtered._id === cat.type);
      });
      const filteredCategoryNames = filteredCategory.map((cat) => cat.name);

      const filteredtransaction = state.expenseBreakdown
        .map((trans) => {
          const filteredTrans = { date: trans.date };
          filteredCategoryNames.forEach((name) => {
            if (trans[name] !== undefined) {
              filteredTrans[name] = trans[name];
            }
          });
          return filteredTrans;
        })
        .filter((trans) => Object.keys(trans).length > 1);

      return {
        ...state,
        monthlySumTransactionType: updatedTransactionTypes,
        expenseBreakdownInUse: filteredtransaction,
      };
    default:
      return state;
  }
};

export default homeReducer;
