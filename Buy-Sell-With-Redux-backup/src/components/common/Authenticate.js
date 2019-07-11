import React, { PropTypes } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
