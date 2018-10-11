import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FirebaseActions from '../../firebase';
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

    this.props.createUser(email, password);
  }

  signIn() {
    const { email, password } = this.state;

    FirebaseActions.signInWithEmailAndPassword(email, password)
  }

  handleOnNameChange(e) {
    this.setState({ email: e.target.value });
  }

  handleOnPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Fragment>
        {
          this.props.loginInProgress &&
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
            {this.props.translations.signUp}
          </button>

          <button
            type="submit"
            onClick={this.signIn}
          >
            {this.props.translations.signIn}
          </button>
        </form>

        {
          this.props.error &&
          <p>{`${this.props.translations.errorWhenLogin}: ${this.props.error}`}</p>
        }
      </Fragment>
    );
  }
}

LoginForm.defaultProps = {
  translations: {
    signUp: 'Zaregistrovat se',
    signIn: 'Přihlásit se',
    errorWhenLogin: 'Vyskytla se chyba při přihlašování'
  },
  createUser: () => {}
};

LoginForm.propTypes = {
  translations: PropTypes.shape({
    signUp: PropTypes.string,
    signIn: PropTypes.string,
    errorWhenLogin: PropTypes.string
  }),
  createUser: PropTypes.func
};

export default withTranslationsContext(LoginForm);
