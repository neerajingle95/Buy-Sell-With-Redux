import { combineReducers } from "redux";
import products from "./buyerReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import sellerProducts from "./sellerReducer";
import isAuthenticated from "./loginReducer";
import isBought from "./productStatusReducer";

const rootReducer = combineReducers({
  products,
  ajaxCallsInProgress,
  sellerProducts,
  isAuthenticated,
  isBought
});

export default rootReducer;
