import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function sellerReducer(
  state = initialState.sellerProducts,
  action
) {
  switch (action.type) {
    case types.LOAD_SELLER_PRODUCTS_SUCCESS:
      return action.sellerProducts;

    case types.CREATE_SELLER_PRODUCT_SUCCESS:
      return [...state, Object.assign({}, action.sellerProduct)];

    case types.UPDATE_SELLER_PRODUCT_SUCCESS:
      return [
        ...state.filter(
          sellerProduct => sellerProduct.id !== action.sellerProduct.id
        ),
        Object.assign({}, action.sellerProduct)
      ];

    case types.DELETE_SELLER_PRODUCT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfProductToDelete = state.findIndex(sellerProduct => {
        return sellerProduct !== action.sellerProduct;
      });
      newState.splice(indexOfProductToDelete, 1);
      return newState;
    }

    default:
      return state;
  }
}
