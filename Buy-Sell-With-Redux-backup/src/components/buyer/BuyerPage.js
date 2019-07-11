import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as buyerActions from "../../actions/buyerActions";
import BuyerList from "./BuyerList";

class BuyerPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      product: Object.assign({}, this.props.product)
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  logoutUser() {
    this.context.router.push("/");
  }

  deleteProduct(event) {
    this.props.actions.deleteProduct(this.state.product);
  }

  render() {
    const { products, isBought } = this.props;
    return (
      <div>
        <h1>Products</h1>

        <BuyerList
          products={products}
          onDeleteClick={this.deleteProduct}
          isBought={isBought}
        />

        <input
          type="submit"
          value="Logout"
          className="btn btn-primary"
          onClick={this.logoutUser}
        />
      </div>
    );
  }
}

BuyerPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isBought: PropTypes.bool.isRequired
};

BuyerPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
    isBought: state.isBought
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(buyerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPage);
