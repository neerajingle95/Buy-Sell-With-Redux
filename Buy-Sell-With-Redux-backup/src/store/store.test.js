import expect from "expect";
import { createStore } from "redux";
import rootReducer from "../reducers";
import initialState from "../reducers/initialState";
import * as buyerActions from "../actions/buyerActions";

describe("Store", () => {
  it("Should handle creating products", () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const product = {
      name: "Sample Product"
    };

    // act
    const action = buyerActions.createProductSuccess(product);
    store.dispatch(action);

    // assert
    const actual = store.getState().products[0];
    const expected = {
      name: "Sample Product"
    };

    expect(actual).toEqual(expected);
  });
});
