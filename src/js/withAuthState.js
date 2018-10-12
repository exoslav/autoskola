import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { authStateController } from './redux/reducers/authReducer';

export default (BaseComponent) => {
  class WithAuthState extends React.Component {
    componentDidMount() {
      this.props.authStateController(this.props.user);
    }

    render() {
      return (
        <BaseComponent {...this.props} />
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authStateController }, dispatch);
  }

  function mapStateToProps(state) {
    return { user: state.auth.user };
  }

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WithAuthState)
  );
}
