import * as types from "./actionTypes";

export function userLogin() {
  return {
    type: types.LOGIN_SUCCESS
  };
}

export function login() {
  return function(dispatch) {
    dispatch(userLogin());
  };
}
