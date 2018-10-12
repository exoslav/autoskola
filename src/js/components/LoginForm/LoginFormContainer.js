import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signInUser, signUpUser, TYPE_SIGN_IN, TYPE_SIGN_UP } from '../../redux/reducers/authReducer';

import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  render() {
    return (
      <LoginForm
        error={this.props.error}
        authInProgress={this.props.authInProgress}
        signInUser={this.props.signInUser}
        signUpUser={this.props.signUpUser}
        signInType={TYPE_SIGN_IN}
        signUpType={TYPE_SIGN_UP}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUpUser, signInUser }, dispatch);
}

function mapStateToProps(state) {
  const { authInProgress, error } = state.auth;
  return { authInProgress, error };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
