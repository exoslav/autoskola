import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withTranslationsContext from '../../withTranslationsContext';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.handleOnNameChange = this.handleOnNameChange.bind(this);
    this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
  }

  signUp() {
    const { email, password } = this.state;

    this.props.signUpUser(email, password);
  }

  signIn() {
    const { email, password } = this.state;

    this.props.signInUser(email, password);
  }

  handleOnNameChange(e) {
    this.setState({ email: e.target.value });
  }

  handleOnPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { authInProgress, translations, error, signInType, signUpType } = this.props;

    return (
      <Fragment>
        {
          authInProgress &&
          <div>Loading...</div>
        }

        <form
          action=""
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            name="login-form-email"
            value={this.state.email}
            onChange={this.handleOnNameChange}
          />

          <input
            type="password"
            name="login-form-password"
            value={this.state.password}
            onChange={this.handleOnPasswordChange}
          />

          <button
            type="submit"
            onClick={this.signUp}
          >
            {translations.signUp}
          </button>

          <button
            type="submit"
            onClick={this.signIn}
          >
            {translations.signIn}
          </button>
        </form>

        {
          error && error.type === signInType &&
          <p>{`${translations.errorWhenSignIn}: ${error.message}`}</p>
        }

        {
          error && error.type === signUpType &&
          <p>{`${translations.errorWhenSignUp}: ${error.message}`}</p>
        }
      </Fragment>
    );
  }
}

LoginForm.defaultProps = {
  authInProgress: false,
  signInType: 'SIGN_IN',
  signUpType: 'SIGN_UP',
  translations: {
    signUp: 'Zaregistrovat se',
    signIn: 'Přihlásit se',
    errorWhenLogin: 'Vyskytla se chyba při přihlašování'
  },
  signInUser: () => {},
  signUpUser: () => {}
};

LoginForm.propTypes = {
  authInProgress: PropTypes.bool,
  signInType: PropTypes.string,
  signUpType: PropTypes.string,
  translations: PropTypes.shape({
    signUp: PropTypes.string,
    signIn: PropTypes.string,
    errorWhenLogin: PropTypes.string
  }),
  signInUser: PropTypes.func,
  signUpUser: PropTypes.func
};

export default withTranslationsContext(LoginForm);
