import React from 'react';
import FirebaseActions from './firebase';

export default (BaseComponent) => {
  class WithAuthState extends React.Component {
    constructor() {
      super();

      this.state = {
        user: null
      };

      this.setUser = this.setUser.bind(this);
    }

    componentDidMount() {
      FirebaseActions.onAuthStateChanged(this.setUser);
    }

    setUser(user) {
      this.setState({ user });
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          user={this.state.user}
        />
      );
    }
  }

  return WithAuthState;
}

