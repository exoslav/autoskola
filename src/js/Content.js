import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import TestPage from './pages/TestPage/TestPageContainer';
import QuestionsListPage from './pages/QuestionsListPage/QuestionsListPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import SavedQuestionsPage from './pages/SavedQuestionsPage/SavedQuestionsPage';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContentBlock from './components/ContentBlock/ContentBlock';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

function isHomePage(pathName) {
  return pathName === '/';
}

class Content extends React.Component {
  render() {
    return (
      <div className={`${isHomePage(this.props.location.pathname) ? 'homepage' : 'not-homepage'}`}>
        <Header user={this.props.user} />

        <ContentBlock>
          {
            !isHomePage(this.props.location.pathname) &&
            <div className="container">
              <Breadcrumbs breadcrumbsRoutes={this.props.breadcrumbsRoutes} />
            </div>
          }
        </ContentBlock>

        <Route
          exact
          path="/"
          component={HomePage}
        />

        {
          !isHomePage(this.props.location.pathname) &&
          <Fragment>
            <Route
              path="/oblibene-otazky"
              render={(props) => (
                <SavedQuestionsPage setBreadcrumbsRoutes={this.props.setBreadcrumbsRoutes} />
              )}
            />

            <Route
              exact
              path="/otazky/:categoryId"
              render={(props) => (
                <QuestionsListPage
                  categoryId={props.match.params.categoryId}
                  setBreadcrumbsRoutes={this.props.setBreadcrumbsRoutes}
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
          </Fragment>
        }

        <Footer/>
      </div>
    );
  }
}

export default Content;
