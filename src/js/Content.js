import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import Container from './components/Container/Container';
import TestPage from './pages/TestPage/TestPageContainer';
import QuestionsListPage from './pages/QuestionsListPage/QuestionsListPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import FavouriteQuestionsPage from './pages/FavouriteQuestionsPage/FavouriteQuestionsPage';
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
              component={FavouriteQuestionsPage}
            />

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
