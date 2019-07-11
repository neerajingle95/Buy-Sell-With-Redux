import React, { PropTypes } from "react";
import BuyerListRow from "./BuyerListRow";

const BuyerList = ({ products, onDeleteClick, isBought }) => {
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
        {products.map(product => (
          <BuyerListRow
            key={product.id}
            product={product}
            onDeleteClick={onDeleteClick}
            isBought={isBought}
          />
        ))}
      </tbody>
    </table>
  );
};

BuyerList.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isBought: PropTypes.bool.isRequired
};

export default BuyerList;
