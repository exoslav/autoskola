import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import TestPage from './pages/TestPage';
import QuestionsListPage from './pages/QuestionsListPage/QuestionsListPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
//import QuestionDetailPage from './pages/QuestionDetailPage';
import HomePage from './pages/HomePage';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import Header from './components/Header/Header';

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
          exact
          path="/otazky/:categoryId"
          component={QuestionsListPage}
        />

        <Route
          exact
          path="/otazky/:categoryId/:questionId"
          component={QuestionDetailPage}
        />

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

const mapStateToProps = (state) => {
  return {
    questionFields: state.questionFields
  };
}

export default connect(mapStateToProps)(Content)
