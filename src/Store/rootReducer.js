import { combineReducers } from "redux";
import commonReducer from "Router/Store/reducer";

import authReducer from "../Router/Auth/store/reducer";
import homeReducer from "../Router/Home/store/reducer";
import transactionReducer from "../Router/Transaction/store/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  common: commonReducer,
  transaction: transactionReducer,
});

export default rootReducer;
