import React from 'react';
import FirebaseActions from './firebase';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      signUpInProgress: false,
      email: '',
      password: '111111'
    };

    this.handleOnNameChange = this.handleOnNameChange.bind(this);
    this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
  }

  signUp() {
    const { email, password } = this.state;

    const self = this;

    self.setState({ signUpInProgress: true })

    FirebaseActions.createUser(email, password)
      .then(() => {
        self.setState({ signUpInProgress: false })
      });
  }

  handleOnNameChange(e) {
    this.setState({ email: e.target.value });
  }

  handleOnPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.signUpInProgress &&
          <div>Právě probíhá registrace...</div>
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
            onClick={() => this.signUp()}
          >
            Zaregistrovat se
          </button>
          <button
            type="submit"
            onClick={() => this.signIn()}
          >
            Přihlásit se
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
