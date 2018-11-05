import React from 'react';
import PropTypes from 'prop-types';
import withTranslationsContext from '../../withTranslationsContext';
import LoginFormStyles from './LoginFormStyles.scss';

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
      <div className="login-form__wrapper">
        {
          authInProgress &&
          <div>Loading...</div>
        }

        <form
          action=""
          onSubmit={e => e.preventDefault()}
        >
        <div className="froms__field-wrap">
          <label
            className="froms__label"
            for="login-form-email"
          >
            E-mail:
          </label>
          <input
            id="login-form-email"
            className="froms__input-email"
            type="email"
            name="login-form-email"
            value={this.state.email}
            onChange={this.handleOnNameChange}
            />
        </div>

        <div className="froms__field-wrap">
          <label
            className="froms__label"
            for="login-form-password"
          >
            Heslo:
          </label>
          <input
            id="login-form-password"
            className="froms__input-password"
            type="password"
            name="login-form-password"
            value={this.state.password}
            onChange={this.handleOnPasswordChange}
          />
        </div>

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
      </div>
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
