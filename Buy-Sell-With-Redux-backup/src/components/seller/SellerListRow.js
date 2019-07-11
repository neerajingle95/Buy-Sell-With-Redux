import React, { PropTypes } from "react";
import { Link } from "react-router";

const SellerListRow = ({ sellerProduct, onSellerDeleteClick }) => {
  return (
    <tr>
      <td>
        <Link to={"/seller/" + sellerProduct.id}>{sellerProduct.name}</Link>
      </td>
      <td>{sellerProduct.price}/-</td>
      <td>{sellerProduct.type}</td>
      <td>{sellerProduct.category}</td>
      <td>
        <input
          type="submit"
          value="X"
          className="btn btn-secondary"
          onClick={onSellerDeleteClick}
          id={sellerProduct.id}
        />
      </td>
    </tr>
  );
};

SellerListRow.propTypes = {
  sellerProduct: PropTypes.object.isRequired,
  onSellerDeleteClick: PropTypes.func.isRequired
};

export default SellerListRow;
