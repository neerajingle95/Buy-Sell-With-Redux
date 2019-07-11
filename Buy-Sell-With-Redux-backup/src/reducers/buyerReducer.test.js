import expect from "expect";
import buyerReducer from "./buyerReducer";
import * as actions from "../actions/buyerActions";

describe("Buyer Reducer", () => {
  it("should add product when passed CREATE_PRODUCT_SUCCESS", () => {
    // arrange
    const initialState = [{ name: "A" }, { name: "B" }];

    const newProduct = { name: "C" };

    const action = actions.createProductSuccess(newProduct);

    // act
    const newState = buyerReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual("A");
    expect(newState[1].name).toEqual("B");
    expect(newState[2].name).toEqual("C");
  });

  it("should update product when passed UPDATE_PRODUCT_SUCCESS", () => {
    // arrange
    const initialState = [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "3", name: "C" }
    ];

    const product = { id: "2", name: "New Product" };
    const action = actions.updateProductSuccess(product);

    // act
    const newState = buyerReducer(initialState, action);
    const updatedProduct = newState.find(a => a.id == product.id);
    const untouchedProduct = newState.find(a => a.id == "1");

    // assert
    expect(updatedProduct.name).toEqual("New Product");
    expect(untouchedProduct.name).toEqual("A");
    expect(newState.length).toEqual(3);
  });
});
