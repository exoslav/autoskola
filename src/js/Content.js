import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import Container from './components/Container/Container';
import TestPage from './pages/TestPage/TestPageContainer';
import QuestionsListPage from './pages/QuestionsListPage/QuestionsListPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import SavedQuestionsPage from './pages/SavedQuestionsPage/SavedQuestionsPage';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';

class Content extends React.Component {
  render() {
    return (
      <Fragment>
        <Header user={this.props.user} />

        <Route
          exact
          path="/"
          component={HomePage}
        />
          
        {
          this.props.location.pathname !== '/' &&
          <Container classNames="app-content">
            <Route
              path="/oblibene-otazky"
              component={SavedQuestionsPage}
            />

            <Route
              exact
              path="/otazky/:categoryId"
              render={(props) => (
                <QuestionsListPage
                  categoryId={props.match.params.categoryId}
                />
              )}
            />

            <Route
              exact
              path="/otazky/:categoryId/:questionId"
              render={(props) => (
                <QuestionDetailPage
                  questionId={props.match.params.questionId}
                  categoryId={props.match.params.categoryId}
                />
              )}
            />

            <Route
              path="/test"
              component={TestPage}
            />
          </Container>
        }

        {/*<Route*/}
          {/*path="/test"*/}
          {/*render={(props) => (*/}
            {/*<TestPage*/}
              {/*{...props}*/}
              {/*user={this.props.user}*/}
            {/*/>*/}
          {/*)}*/}
        {/*/>*/}
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
