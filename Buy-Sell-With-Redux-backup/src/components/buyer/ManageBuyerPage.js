import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sellerActions from "../../actions/sellerActions";
import BuyerForm from "./BuyerForm";
import toastr from "toastr";

export class ManageBuyerPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sellerProduct: Object.assign({}, this.props.sellerProduct),
      errors: {},
      saving: false
    };

    this.updateSellerProductState = this.updateSellerProductState.bind(this);
    this.saveSellerProductData = this.saveSellerProductData.bind(this);
    this.backToList = this.backToList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sellerProduct.id != nextProps.sellerProduct.id) {
      // Necessary to populate form when existing product is loaded directly
      this.setState({
        sellerProduct: Object.assign({}, nextProps.sellerProduct)
      });
    }
  }

  updateSellerProductState(event) {
    const field = event.target.name;
    let sellerProduct = Object.assign({}, this.state.sellerProduct);
    sellerProduct[field] = event.target.value;
    return this.setState({ sellerProduct: sellerProduct });
  }

  buyerFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.sellerProduct.name.length < 5) {
      errors.name = "Name must be at least 5 characters.";
      formIsValid = false;
    }

    if (!this.state.sellerProduct.price) {
      errors.price = "Please enter the price of the product.";
      formIsValid = false;
    }

    if (!this.state.sellerProduct.type) {
      errors.type = "Please select the type of the product.";
      formIsValid = false;
    }

    if (!this.state.sellerProduct.category) {
      errors.category = "Please select the category of the product.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveSellerProductData(event) {
    event.preventDefault();

    if (!this.buyerFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    this.props.actions
      .saveSellerProduct(this.state.sellerProduct)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Product saved");
    this.context.router.push("/sellers");
  }

  backToList() {
    this.context.router.push("/sellers");
  }

  render() {
    return (
      <BuyerForm
        allTypes={this.props.types}
        allCategories={this.props.categories}
        onChange={this.updateSellerProductState}
        onSave={this.saveSellerProductData}
        sellerProduct={this.state.sellerProduct}
        errors={this.state.errors}
        saving={this.state.saving}
        onBackClick={this.backToList}
      />
    );
  }
}

ManageBuyerPage.propTypes = {
  sellerProduct: PropTypes.object.isRequired,
  types: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageBuyerPage.contextTypes = {
  router: PropTypes.object
};

function getSellerProductById(sellerProducts, id) {
  const sellerProduct = sellerProducts.filter(
    sellerProduct => sellerProduct.id == id
  );
  if (sellerProduct.length) return sellerProduct[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const sellerProductId = ownProps.params.id; // from the path `/buyer/:id`

  let sellerProduct = { name: "", price: "", type: "", category: "", id: "" };

  if (sellerProductId && state.sellerProducts.length > 0) {
    sellerProduct = getSellerProductById(state.sellerProducts, sellerProductId);
  }

  const types = [
    {
      value: "Vehicle",
      text: "Vehicle"
    },
    {
      value: "Crockery",
      text: "Crockery"
    },
    {
      value: "Stationery",
      text: "Stationery"
    },
    {
      value: "Clothes",
      text: "Clothes"
    },
    {
      value: "Electronics",
      text: "Electronics"
    }
  ];

  const categories = [
    {
      value: "Brand new",
      text: "Brand new"
    },
    {
      value: "Second hand",
      text: "Second hand"
    }
  ];

  return {
    sellerProduct: sellerProduct,
    types: types,
    categories: categories
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
)(ManageBuyerPage);
