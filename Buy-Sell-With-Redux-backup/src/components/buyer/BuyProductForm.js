import React, { PropTypes } from "react";
import TextInput from "../common/TextInput";

const BuyProductForm = ({
  buyerCredentials,
  onSave,
  onChange,
  saving,
  errors,
  onBackClick,
  products
}) => {
  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf("/") + 1);

  return (
    <form>
      <h1>Buy Product</h1>
      {products
        .filter(products => products.id == id)
        .map(product => (
          <div key={product.id}>
            <b>Name:</b> {product.name}
            <br />
            <br />
            <b>Price:</b> Rs. {product.price}/-
            <br />
            <br />
            <b>Type:</b> {product.type}
            <br />
            <br />
            <b>Category:</b> {product.category}
            <br />
            <br />
          </div>
        ))}

      <TextInput
        name="firstName"
        label="First Name"
        value={buyerCredentials.firstName}
        onChange={onChange}
        error={errors.firstName}
      />

      <TextInput
        name="lastName"
        label="Last Name"
        value={buyerCredentials.lastName}
        onChange={onChange}
        error={errors.lastName}
      />

      <TextInput
        name="cardNumber"
        label="Card Number"
        value={buyerCredentials.cardNumber}
        onChange={onChange}
        error={errors.cardNumber}
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

BuyProductForm.propTypes = {
  buyerCredentials: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  products: PropTypes.array.isRequired
};

export default BuyProductForm;
