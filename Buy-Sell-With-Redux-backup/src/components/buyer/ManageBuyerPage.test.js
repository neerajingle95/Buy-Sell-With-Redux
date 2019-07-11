import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { ManageBuyerPage } from "./ManageBuyerPage";

describe("Manage Buyer Page", () => {
  it("sets error message when trying to save empty name", () => {
    const props = {
      types: [],
      categories: [],
      actions: {
        saveSellerProduct: () => {
          return Promise.resolve();
        }
      },
      sellerProduct: { name: "", price: "", type: "", category: "", id: "" }
    };
    const wrapper = mount(<ManageBuyerPage {...props} />);
    const saveButton = wrapper.find("input").last();
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate("click");
    expect(wrapper.state().errors.name).toBe(
      "Name must be at least 5 characters."
    );
  });
});
