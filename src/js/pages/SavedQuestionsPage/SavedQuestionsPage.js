import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import compose from '../../utils/compose';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader';
import withSavedQuestionsFetcher from './withSavedQuestionsFetcher';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSavedQuestionsRecourcer from '../../components/hoc/withSavedQuestionsResourcer';
import Loader from '../../components/Loader/Loader';

class SavedQuestionsPage extends React.Component {
  render() {
    return (
      <Fragment>
        {
          !this.props.user &&
          <div>Pro prohlížení stránky s uloženými otázkami musíte být přihlášen!</div>
        }

        {
          this.props.user &&
          <Fragment>
            <QuestionListHeader
              displayView={this.props.displayView}
              onDisplayViewChange={this.props.onDisplayViewChange}
            />

            {
              (this.props.savedQuestionsLoading || this.props.questionsLoading) &&
              <div className="list-page__loader">
                <Loader/>
                <p className="list-page__loader__label">Načítá se seznam otázek</p>
              </div>
            }

            <QuestionList
              items={this.props.questions}
              displayView={this.props.displayView}
            />
          </Fragment>
        }
      </Fragment>
    );
  }
}

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
  withDisplayView
)(SavedQuestionsPage);

export default enhancedQuestionDetailPage;
