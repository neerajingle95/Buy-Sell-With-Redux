import * as types from "./actionTypes";
import buyerApi from "../api/mockBuyerApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function createProductSuccess(product) {
  return { type: types.CREATE_PRODUCT_SUCCESS, product };
}

export function updateProductSuccess(product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}

export function deleteProductSuccess(product) {
  return { type: types.DELETE_PRODUCT_SUCCESS, product };
}

export function loadProducts() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return buyerApi
      .getAllProducts()
      .then(products => {
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProduct(product) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return buyerApi
      .saveProduct(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteProduct(product) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return buyerApi
      .deleteProduct(product)
      .then(() => {
        dispatch(deleteProductSuccess(product));
      })
      .catch(error => {
        throw error;
      });
  };
}
