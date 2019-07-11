import React, { PropTypes } from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const BuyerForm = ({
  sellerProduct,
  allTypes,
  allCategories,
  onSave,
  onChange,
  saving,
  errors,
  onBackClick
}) => {
  return (
    <form>
      <h1>Add Product</h1>
      <TextInput
        name="name"
        label="Name"
        value={sellerProduct.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="price"
        label="Price"
        value={sellerProduct.price}
        onChange={onChange}
        error={errors.price}
        type="number"
      />

      <SelectInput
        name="type"
        label="Type"
        value={sellerProduct.type}
        defaultOption="Select Type"
        options={allTypes}
        onChange={onChange}
        error={errors.type}
      />

      <SelectInput
        name="category"
        label="Category"
        value={sellerProduct.category}
        defaultOption="Select Category"
        options={allCategories}
        onChange={onChange}
        error={errors.category}
      />

      <input
        type="submit"
        value="Back"
        className="btn btn-primary"
        onClick={onBackClick}
      />
      <span>&emsp;</span>

      <input
        type="submit"
        disabled={saving}
        value={saving ? "Saving..." : "Save"}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

BuyerForm.propTypes = {
  sellerProduct: PropTypes.object.isRequired,
  allTypes: PropTypes.array,
  allCategories: PropTypes.array,
  onSave: PropTypes.func,
  onBackClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default BuyerForm;
