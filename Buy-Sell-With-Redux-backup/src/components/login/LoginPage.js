import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginForm from "./LoginForm";
import toastr from "toastr";
import * as loginActions from "../../actions/loginActions";

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loginCredentials: Object.assign({}, this.props.loginCredentials),
      errors: {},
      loggingIn: false
    };

    this.updateCredentialsState = this.updateCredentialsState.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  updateCredentialsState(event) {
    const field = event.target.name;
    let loginCredentials = Object.assign({}, this.state.loginCredentials);
    loginCredentials[field] = event.target.value;
    return this.setState({ loginCredentials: loginCredentials });
  }

  loginIsValid() {
    let formIsValid = true;
    let errors = {};

    if (!this.state.loginCredentials.username) {
      errors.username = "Please enter a username.";
      formIsValid = false;
    } else if (this.state.loginCredentials.username !== "pa") {
      errors.username = "Invalid username.";
      formIsValid = false;
    }

    if (!this.state.loginCredentials.password) {
      errors.password = "Please enter a password.";
      formIsValid = false;
    } else if (this.state.loginCredentials.password !== "egain123") {
      errors.password = "Invalid password.";
      formIsValid = false;
    }

    if (!this.state.loginCredentials.role) {
      errors.role =
        "Please select whether you want to login as a buyer or as a seller.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  loginUser(event) {
    event.preventDefault();

    if (!this.loginIsValid()) {
      return;
    }

    if (this.state.loginCredentials.role) {
      this.redirect();
    }
  }

  redirect() {
    this.props.actions.login();
    toastr.success("You are logged in!");
    this.state.loginCredentials.role === "buyer"
      ? this.context.router.push("/buyers")
      : this.context.router.push("/sellers");
  }

  render() {
    return (
      <LoginForm
        allRoles={this.props.roles}
        onChange={this.updateCredentialsState}
        onLogin={this.loginUser}
        loginCredentials={this.state.loginCredentials}
        errors={this.state.errors}
        loggingIn={this.state.loggingIn}
      />
    );
  }
}

LoginPage.propTypes = {
  loginCredentials: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let loginCredentials = { username: "", password: "", role: "" };

  const roles = [
    {
      value: "buyer",
      text: "Buyer"
    },
    {
      value: "seller",
      text: "Seller"
    }
  ];

  return {
    loginCredentials: loginCredentials,
    roles: roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
