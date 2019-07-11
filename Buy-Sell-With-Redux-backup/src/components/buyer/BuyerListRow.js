import React, { PropTypes } from "react";
import { Link } from "react-router";

const BuyerListRow = ({ product, onDeleteClick, isBought }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}/-</td>
      <td>{product.type}</td>
      <td>{product.category}</td>
      {/* Need to get id of selected product */}
      {isBought === true && product.id === 1 ? (
        <td>
          <input
            type="submit"
            value="Bought"
            className="btn btn-primary"
            disabled
          />
        </td>
      ) : (
        <td>
          <Link to={"/buyProduct/" + product.id}>
            <input
              type="submit"
              value="Buy"
              className="btn btn-primary"
              id={product.id}
            />
          </Link>
        </td>
      )}
      <td>
        <input
          type="submit"
          value="X"
          className="btn btn-secondary"
          onClick={onDeleteClick}
          id={product.id}
        />
      </td>
    </tr>
  );
};

BuyerListRow.propTypes = {
  product: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isBought: PropTypes.bool.isRequired
};

export default BuyerListRow;
