import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
import BuyerForm from "./BuyerForm";

function setup(saving) {
  const props = {
    sellerProduct: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<BuyerForm {...props} />);
}

describe("BuyerForm via Enzyme", () => {
  it("renders form and h1", () => {
    const wrapper = setup(false);
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h1").text()).toEqual("Add Product");
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(
      wrapper
        .find("input")
        .at(1)
        .props().value
    ).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(
      wrapper
        .find("input")
        .at(1)
        .props().value
    ).toBe("Saving...");
  });
});
