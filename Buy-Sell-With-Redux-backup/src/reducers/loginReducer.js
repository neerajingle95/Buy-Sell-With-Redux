import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(
  state = initialState.isAuthenticated,
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
}
