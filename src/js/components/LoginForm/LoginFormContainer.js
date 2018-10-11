import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { createUser } from '../../redux/reducers/loginReducer';

import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  render() {
    return (
      <LoginForm
        error={this.props.error}
        loginInProgress={this.props.loginInProgress}
        createUser={this.props.createUser}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser }, dispatch);
}

function mapStateToProps(state) {
  const { loginInProgress, error } = state.login;
  return { loginInProgress, error };
}

const withMapDispatchToProps = connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);

export default withMapDispatchToProps;
