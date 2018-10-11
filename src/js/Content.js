import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import Header from './Header';

class Content extends React.Component {
  render() {
    return (
      <Fragment>
        <Header user={this.props.user} />

        {
          !this.props.user &&
          <LoginFormContainer user={this.props.user} />
        }

        <Route
          path="/testy/:id"
          render={(props) => (
            <TestPage
              {...props}
              user={this.props.user}
            />
          )}
        />
        <Route exact path="/" component={HomePage} />
      </Fragment>
    );
  }
}

export default Content;
