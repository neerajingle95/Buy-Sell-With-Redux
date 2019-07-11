import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sellerActions from "../../actions/sellerActions";
import SellerList from "./SellerList";

class SellerPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sellerProduct: Object.assign({}, this.props.sellerProduct)
    };

    this.redirectToAddProductPage = this.redirectToAddProductPage.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.deleteSellerProduct = this.deleteSellerProduct.bind(this);
  }

  redirectToAddProductPage() {
    browserHistory.push("/seller");
  }

  logoutUser() {
    this.context.router.push("/");
  }

  deleteSellerProduct(event) {
    this.props.actions.deleteSellerProduct(this.state.sellerProduct);
  }

  render() {
    const { sellerProducts } = this.props;
    return (
      <div>
        <h1>Products</h1>

        <SellerList
          sellerProducts={sellerProducts}
          onSellerDeleteClick={this.deleteSellerProduct}
        />

        <input
          type="submit"
          value="Add Product"
          className="btn btn-primary"
          onClick={this.redirectToAddProductPage}
        />
        <span>&emsp;</span>
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

SellerPage.propTypes = {
  sellerProducts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

SellerPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    sellerProducts: state.sellerProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sellerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerPage);
