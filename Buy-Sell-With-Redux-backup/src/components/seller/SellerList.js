import React, { PropTypes } from "react";
import SellerListRow from "./SellerListRow";

const SellerList = ({ sellerProducts, onSellerDeleteClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price (in Rs.)</th>
          <th>Type</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {sellerProducts.map(sellerProduct => (
          <SellerListRow
            key={sellerProduct.id}
            sellerProduct={sellerProduct}
            onSellerDeleteClick={onSellerDeleteClick}
          />
        ))}
      </tbody>
    </table>
  );
};

SellerList.propTypes = {
  sellerProducts: PropTypes.array.isRequired,
  onSellerDeleteClick: PropTypes.func.isRequired
};

export default SellerList;
