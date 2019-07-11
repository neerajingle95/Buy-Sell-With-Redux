import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BuyProductForm from "./BuyProductForm";
import toastr from "toastr";
import * as productStatusActions from "../../actions/productStatusActions";

class BuyProductPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      buyerCredentials: Object.assign({}, this.props.buyerCredentials),
      errors: {},
      saving: false
    };

    this.updateBuyerCredentialsState = this.updateBuyerCredentialsState.bind(
      this
    );
    this.saveBuyerCredentials = this.saveBuyerCredentials.bind(this);
    this.backToList = this.backToList.bind(this);
  }

  updateBuyerCredentialsState(event) {
    const field = event.target.name;
    let buyerCredentials = Object.assign({}, this.state.buyerCredentials);
    buyerCredentials[field] = event.target.value;
    return this.setState({ buyerCredentials: buyerCredentials });
  }

  buyProductFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.buyerCredentials.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters.";
      formIsValid = false;
    }

    if (this.state.buyerCredentials.lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters.";
      formIsValid = false;
    }

    if (
      this.state.buyerCredentials.cardNumber.length != 16 ||
      isNaN(this.state.buyerCredentials.cardNumber)
    ) {
      errors.cardNumber = "Card number must have exactly 16 digits.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveBuyerCredentials(event) {
    event.preventDefault();
    if (!this.buyProductFormIsValid()) {
      return;
    }
    this.setState({ saving: true });
    this.props.actions.changeProductStatus();
    this.redirect();
  }

  redirect() {
    toastr.success("Credentials saved");
    this.context.router.push("/buyers");
  }

  backToList() {
    this.context.router.push("/buyers");
  }

  render() {
    const { products } = this.props;

    return (
      <BuyProductForm
        onChange={this.updateBuyerCredentialsState}
        onSave={this.saveBuyerCredentials}
        buyerCredentials={this.state.buyerCredentials}
        errors={this.state.errors}
        saving={this.state.saving}
        onBackClick={this.backToList}
        products={products}
      />
    );
  }
}

BuyProductPage.propTypes = {
  buyerCredentials: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

BuyProductPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let buyerCredentials = { firstName: "", lastName: "", cardNumber: "" };

  return {
    buyerCredentials: buyerCredentials,
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productStatusActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyProductPage);
