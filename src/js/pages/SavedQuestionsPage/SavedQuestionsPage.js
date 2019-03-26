import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';

import compose from '../../utils/compose';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader';
import withSavedQuestionsFetcher from './withSavedQuestionsFetcher';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSavedQuestionsRecourcer from '../../components/hoc/withSavedQuestionsResourcer';
import Loader from '../../components/Loader/Loader';

const breadcrumbsRoutes = [
  {
    label: 'Ulozene otazky',
    link: 'oblibene-otazky'
  }
];

const SavedQuestionsPage = ({
  user,
  displayView,
  onDisplayViewChange,
  savedQuestionsLoading,
  questionsLoading,
  questions
}) => (
  <Fragment>
    {
      !user &&
      <div>Pro prohlížení stránky s uloženými otázkami musíte být přihlášen!</div>
    }

    {
      user &&
      <Fragment>
        <QuestionListHeader
          displayView={displayView}
          onDisplayViewChange={onDisplayViewChange}
        />

        {
          (savedQuestionsLoading || questionsLoading) &&
          <div className="list-page__loader">
            <Loader/>
            <p className="list-page__loader__label">Načítá se seznam otázek</p>
          </div>
        }

        <QuestionList
          items={questions}
          displayView={displayView}
        />
      </Fragment>
    }
  </Fragment>
);

SavedQuestionsPage.propTypes = {
  displayView: PropTypes.string,
  savedQuestions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  savedQuestionsLoading: PropTypes.bool,
  onDisplayViewChange: PropTypes.func
};

SavedQuestionsPage.defaultProps = {
  displayView: 'lines',
  savedQuestions: [],
  savedQuestionsLoading: false,
  onDisplayViewChange: () => {}
};

const enhancedQuestionDetailPage = compose(
  withUser,
  withSavedQuestionsRecourcer,
  withSavedQuestionsFetcher,
  withComposedQuestions,
  withDisplayView,
  lifecycle({
    componentDidMount() {
      this.props.setBreadcrumbsRoutes(breadcrumbsRoutes);
    }
  })
)(SavedQuestionsPage);

export default enhancedQuestionDetailPage;
