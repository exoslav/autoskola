import React from 'react';

import LoginForm from './LoginForm';
import Header from './Header';

class Content extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header user={this.props.user} />
        <LoginForm />
      </React.Fragment>
    );
  }
}

export default Content;
