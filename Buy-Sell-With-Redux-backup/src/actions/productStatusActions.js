import * as types from "./actionTypes";

export function showProductAsBought() {
  return {
    type: types.BOUGHT_SUCCESS
  };
}

export function changeProductStatus() {
  return function(dispatch) {
    dispatch(showProductAsBought());
  };
}
