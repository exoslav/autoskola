import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import compose from '../../utils/compose';
import withFavouriteQuestion from './withFavouriteQuestion';
import withCurrentQuestion from './withCurrentQuestion';
import withUser from '../../components/hoc/withUser';
import withFavouriteQuestionResourcer from '../../components/hoc/withFavouriteQuestionResourcer';
import { getQuestion, removeQuestionFromCategory } from '../../redux/reducers/questionsReducer';
import {
  addFavouriteQuestion,
  removeFavouriteQuestion,
  removeFavouriteQuestionFromState
} from '../../redux/reducers/favouriteQuestionsReducer';

class QuestionDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAnswer: null,
    };

    this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
  }

  componentDidMount() {
    const { categoryId, questionId} = this.props.match.params;

    this.props.getQuestion(categoryId, questionId);
  }

  componentWillUnmount() {
    this.props.removeQuestionFromCategory(this.props.match.params.categoryId);

    if (this.props.user) {
      this.props.removeFavouriteQuestionFromState();
    }
  }

  answerOnClick(index) {
    this.setState({ selectedAnswer: index })
  }

  handleFavouriteClick(currentQuestion) {
    if (this.props.user) {
      if (this.props.favourite) {
        this.props.removeFavouriteQuestion(currentQuestion.id, this.props.user.uid);
      } else {
        this.props.addFavouriteQuestion({
          ...currentQuestion,
          categoryId: this.props.match.params.categoryId
        }, this.props.user.uid);
      }
    }
  }

  render() {
    if (this.props.fetching || !this.props.currentQuestion) {
      return (
        <div>loading...</div>
      );
    }

    const { currentQuestion, user } = this.props;
    const { id, question, answers, correctAnswer, prevQuestion } = currentQuestion;

    console.log(prevQuestion);

    return (
      <div>
        <h1>{`Otázka {${id}}: ${question}`}</h1>
        <ol>
          {
            answers.map((answer, index) => (
              <li
                key={index}
                onClick={() => this.answerOnClick(index)}
                className={(
                  this.state.selectedAnswer === index &&
                  this.state.selectedAnswer === Number(correctAnswer) ? 'correct' : ''
                )}
              >
                {answer}
              </li>
            ))
          }
        </ol>

        {
          user &&
          currentQuestion &&
          <FontAwesomeIcon
            onClick={() => this.handleFavouriteClick(currentQuestion)}
            icon={[this.props.favourite ? 'fas' : 'far', 'star']}
          />
        }
      </div>
    );
  }
}

QuestionDetailPage.defaultProps = {
  fetching: false,
  currentQuestion: null
};

QuestionDetailPage.propTypes = {
  fetching: PropTypes.bool,
  currentQuestion: PropTypes.shape()
};

const mapStateToProps = (state) => {
  return {
    fetching: state.questions.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestion,
    removeQuestionFromCategory,
    addFavouriteQuestion,
    removeFavouriteQuestion,
    removeFavouriteQuestionFromState
  }, dispatch);
}

const withConnect =  connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withCurrentQuestion,
  withFavouriteQuestionResourcer,
  withFavouriteQuestion
)(withConnect);

export default enhancedQuestionDetailPage;
