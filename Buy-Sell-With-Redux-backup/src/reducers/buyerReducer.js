import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function buyerReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    case types.CREATE_PRODUCT_SUCCESS:
      return [...state, Object.assign({}, action.product)];

    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ];

    case types.DELETE_PRODUCT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfProductToDelete = state.findIndex(product => {
        return product !== action.product;
      });
      newState.splice(indexOfProductToDelete, 1);
      return newState;
    }

    default:
      return state;
  }
}
