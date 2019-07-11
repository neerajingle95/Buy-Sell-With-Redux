import * as types from "./actionTypes";
import sellerApi from "../api/mockSellerApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadSellerProductsSuccess(sellerProducts) {
  return { type: types.LOAD_SELLER_PRODUCTS_SUCCESS, sellerProducts };
}

export function createSellerProductSuccess(sellerProduct) {
  return { type: types.CREATE_SELLER_PRODUCT_SUCCESS, sellerProduct };
}

export function updateSellerProductSuccess(sellerProduct) {
  return { type: types.UPDATE_SELLER_PRODUCT_SUCCESS, sellerProduct };
}

export function deleteSellerProductSuccess(sellerProduct) {
  return { type: types.DELETE_SELLER_PRODUCT_SUCCESS, sellerProduct };
}

export function loadSellerProducts() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return sellerApi
      .getAllSellerProducts()
      .then(sellerProducts => {
        dispatch(loadSellerProductsSuccess(sellerProducts));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveSellerProduct(sellerProduct) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return sellerApi
      .saveSellerProduct(sellerProduct)
      .then(savedProduct => {
        sellerProduct.id
          ? dispatch(updateSellerProductSuccess(savedProduct))
          : dispatch(createSellerProductSuccess(savedProduct));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteSellerProduct(sellerProduct) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return sellerApi
      .deleteSellerProduct(sellerProduct)
      .then(() => {
        dispatch(deleteSellerProductSuccess(sellerProduct));
      })
      .catch(error => {
        throw error;
      });
  };
}
