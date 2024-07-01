import { homeAction } from "./action";

const initialState = {
  monthlySum: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case homeAction.FETCH_HOME_DATA:
      return { ...state, monthlySum: action.payload.totalsByType };
    default:
      return state;
  }
};

export default homeReducer;
