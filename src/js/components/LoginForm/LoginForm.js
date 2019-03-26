import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import withTranslationsContext from '../../withTranslationsContext';
import Icon from '../Icon/Icon';

import { removeAuthErrors } from '../../redux/reducers/authReducer';

import './LoginForm.scss';

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
        ${authInProgress ? ' login-form__wrapper--processing' : ''}`}
      >
        {
          authInProgress && <Loader classNames="login-form__loader"/>
        }

        {
          error &&
          <div className="login-form__error">
            <Icon
              size="large"
              icon="exclamation-triangle"
              iconClassName="exclamation-triangle"
              customClassName="login-form__error__icon"
            />

            {
              error.type === signInType &&
              <p className="login-form__error__text">
                <strong className="login-form__error__text__label">{translations.errorWhenSignIn}:</strong>
                <span>{error.message}</span>
              </p>
            }

            {
              error.type === signUpType &&
              <p className="login-form__error__text">
                <strong className="login-form__error__text__label">{translations.errorWhenSignUp}:</strong>
                <span>{error.message}</span>
              </p>
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
            <Button
              onButtonClick={this.signUp}
              type="button"
              text={translations.signUp}
            />

            <Button
              classNames={['button--red']}
              onButtonClick={this.signIn}
              type="submit"
              text={translations.signIn}
            />
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
    errorWhenSignIn: 'Chyba při přihlašování',
    errorWhenSignUp: 'Chyba při registraci'
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
