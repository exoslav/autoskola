import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../Loader/Loader';
import withTranslationsContext from '../../withTranslationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { removeAuthErrors } from '../../redux/reducers/authReducer';

import css from './LoginForm.scss';

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

  componentWillUnmount() {
    this.props.removeAuthErrors();
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
      <div
        className={`
        login-form__wrapper
        ${error ? ' login-form__wrapper--error' : ''}
        ${authInProgress ? ' login-form__wrapper--processing' : ''}`}
      >
        {
          authInProgress && <Loader classNames="login-form__loader"/>
        }

        {
          error &&
          <div className="login-form__error">
            <FontAwesomeIcon
              className="login-form__error__icon"
              icon="exclamation-triangle"
            />

            {
              error.type === signInType &&
              <p className="login-form__error__text">{`${translations.errorWhenSignIn}: ${error.message}`}</p>
            }

            {
              error.type === signUpType &&
              <p className="login-form__error__text">{`${translations.errorWhenSignUp}: ${error.message}`}</p>
            }
          </div>
        }

        <form
          action=""
          onSubmit={e => e.preventDefault()}
        >
          <div className="login-form__body">
            <div className="froms__field-wrap">
              <label
                className="froms__label"
                htmlFor="login-form-email"
              >
                E-mail:
              </label>
              <div className="forms__input-wrap">
                <input
                  id="login-form-email"
                  className="froms__input-email"
                  type="email"
                  name="login-form-email"
                  value={this.state.email}
                  onChange={this.handleOnNameChange}
                />
              </div>
            </div>

            <div className="froms__field-wrap">
              <label
                className="froms__label"
                htmlFor="login-form-password"
              >
                Heslo:
              </label>
              <div className="forms__input-wrap">
                <input
                  id="login-form-password"
                  className="froms__input-password"
                  type="password"
                  name="login-form-password"
                  value={this.state.password}
                  onChange={this.handleOnPasswordChange}
                />
              </div>
            </div>
          </div>

          <div className="login-form__footer">
            <button
              className="login-form__sign-up-button"
              type="button"
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
          </div>
        </form>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAuthErrors }, dispatch);
}

export default withTranslationsContext(
  connect(null, mapDispatchToProps)(LoginForm)
);
