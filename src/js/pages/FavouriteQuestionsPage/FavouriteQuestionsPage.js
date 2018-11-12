import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import compose from '../../utils/compose';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader';
import withFavouriteQuestionsRecourcer from '../../components/hoc/withFavouriteQuestionsResourcer';
import Loader from '../../components/Loader/Loader'

class FavouriteQuestionsPage extends React.Component {
  render() {
    return (
      <Fragment>
        <QuestionListHeader
          displayView={this.props.displayView}
          onDisplayViewChange={this.props.onDisplayViewChange}
        />

        {
          this.props.favouriteQuestionsLoading &&
          <div className="list-page__loader">
            <Loader/>
            <p className="list-page__loader__label">Načítá se seznam otázek</p>
          </div>
        }

        <QuestionList
          items={this.props.favouriteQuestions}
          displayView={this.props.displayView}
        />
      </Fragment>
    );
  }
}

FavouriteQuestionsPage.propTypes = {
  displayView: PropTypes.string,
  favouriteQuestions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  favouriteQuestionsLoading: PropTypes.bool,
  onDisplayViewChange: PropTypes.func
};

FavouriteQuestionsPage.defaultProps = {
  displayView: 'lines',
  favouriteQuestions: [],
  favouriteQuestionsLoading: false,
  onDisplayViewChange: () => {}
};

const withConnect = FavouriteQuestionsPage;

const enhancedQuestionDetailPage = compose(
  withUser,
  withFavouriteQuestionsRecourcer,
  withDisplayView
)(withConnect);

export default enhancedQuestionDetailPage;
