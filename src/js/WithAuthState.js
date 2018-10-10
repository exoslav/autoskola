import React from 'react';
import FirebaseActions from './firebase';

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
      <React.Fragment>
        {React.cloneElement(this.props.children, { user: this.state.user })}
      </React.Fragment>
    );
  }
}

export default WithAuthState;
