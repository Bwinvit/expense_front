import { combineReducers } from "redux";
import homeReducer from "../Router/Home/store/reducer";
import authReducer from "../Router/Auth/store/reducer";

const rootReducer = combineReducers({
    home: homeReducer,
    auth: authReducer,
});

export default rootReducer;
