import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import compose from '../../utils/compose';
import withUser from '../../components/hoc/withUser';
import withFavouriteQuestionsRecourcer from '../../components/hoc/withFavouriteQuestionsResourcer';

class FavouriteQuestionsPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {
          this.props.favouriteQuestions.length > 0 &&
          <ul>
            {
              this.props.favouriteQuestions.map(favouriteQuestion => (
                <li key={favouriteQuestion.id}>
                  <Link to={`/otazky/${favouriteQuestion.categoryId}/${favouriteQuestion.id}`}>
                    {favouriteQuestion.question}
                  </Link>
                </li>
              ))
            }
          </ul>
        }
      </div>
    );
  }
}

FavouriteQuestionsPage.defaultProps = {
  favouriteQuestions: []
};

FavouriteQuestionsPage.propTypes = {
  favouriteQuestions: PropTypes.arrayOf(
    PropTypes.shape({})
  )
};

const withConnect = FavouriteQuestionsPage;

const enhancedQuestionDetailPage = compose(
  withUser,
  withFavouriteQuestionsRecourcer
)(withConnect);

export default enhancedQuestionDetailPage;
