import { combineReducers } from "redux";
import urlAPISlice from "./urlAPI";
import myTokenSlice from './myToken';


const globalConstantsReducer = combineReducers({
  urlAPI: urlAPISlice,
  myToken: myTokenSlice
});

export default globalConstantsReducer;
