import expect from "expect";
import * as buyerActions from "./buyerActions";
import * as types from "./actionTypes";

import thunk from "redux-thunk";
import nock from "nock";
import configureMockStore from "redux-mock-store";

// Test async action
describe("Buyer Actions", () => {
  describe("createProductSuccess", () => {
    it("should create a CREATE_PRODUCT_SUCCESS action", () => {
      //arrange
      const product = { id: 1, name: "Sample Product" };
      const expectedAction = {
        type: types.CREATE_PRODUCT_SUCCESS,
        product: product
      };

      //act
      const action = buyerActions.createProductSuccess(product);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should create BEGIN_AJAX_CALL and LOAD_PRODUCTS_SUCCESS when loading products", done => {
    // Here's an example call to nock.
    // nock('http://example.com/')
    //   .get('/buyers')
    //   .reply(200, { body: { product: [{ id: 1, name: 'Sample Product' }] }});

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      {
        type: types.LOAD_PRODUCTS_SUCCESS,
        body: { products: [{ id: 1, name: "Sample Product" }] }
      }
    ];

    const store = mockStore({ products: [] }, expectedActions);
    store.dispatch(buyerActions.loadProducts()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_PRODUCTS_SUCCESS);
      done();
    });
  });
});
