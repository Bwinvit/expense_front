import { combineReducers } from "redux";
import homeReducer from "../Router/Home/store/reducer";
import authReducer from "../Router/Auth/store/reducer";
import commonReducer from "Router/Store/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  common: commonReducer,
});

export default rootReducer;
