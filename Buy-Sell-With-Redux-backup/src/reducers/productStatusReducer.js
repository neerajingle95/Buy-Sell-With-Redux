import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productStatusReducer(
  state = initialState.isBought,
  action
) {
  switch (action.type) {
    case types.BOUGHT_SUCCESS:
      return true;
    default:
      return state;
  }
}
