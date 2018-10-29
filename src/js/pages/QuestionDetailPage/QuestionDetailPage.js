import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import compose from '../../utils/compose';
import withUser from './withUser';
import withQuestionCategory from './withQuestionCategory';
import withCurrentQuestion from './withCurrentQuestion';
import withFavouriteQuestion from './withFavouriteQuestion';
import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';
import {
  addFavouriteQuestion,
  removeFavouriteQuestion,
  onFavouriteQuestionsChange
} from '../../redux/reducers/favouriteQuestionsReducer';

class QuestionDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAnswer: null,
    };

    this.unsubscribeOnFavouriteQuestionsChangeFunction = () => {};
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.questionCategoryId);

    if (this.props.user) {
      const { uid } = this.props.user;

      this.unsubscribeOnFavouriteQuestionsChangeFunction = this.props.onFavouriteQuestionsChange(uid);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.user &&
      this.props.user !== prevProps.user &&
      this.props.currentQuestion
    ) {
      const { uid } = this.props.user;

      this.unsubscribeOnFavouriteQuestionsChangeFunction = this.props.onFavouriteQuestionsChange(uid);
    }
  }

  componentWillUnmount() {
    if (this.props.user) {
      this.unsubscribeOnFavouriteQuestionsChangeFunction();
    }

    this.props.removeQuestionsFromCategory(this.props.questionCategoryId);
  }

  answerOnClick(index) {
    this.setState({ selectedAnswer: index })
  }

  handleFavouriteClick(currentQuestion) {
    if (this.props.user) {
      if (this.props.favourite) {
        this.props.removeFavouriteQuestion(currentQuestion.id, this.props.user.uid);
      } else {
        this.props.addFavouriteQuestion(currentQuestion, this.props.user.uid);
      }
    }
  }

  render() {
    if (this.props.fetching) {
      return (
        <div>loading...</div>
      );
    }

    const { currentQuestion, user } = this.props;
    const { id, question, answers, correctAnswer } = currentQuestion;

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
  currentQuestion: PropTypes.shape(),
  questionCategoryId: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    fetching: state.questions.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestions,
    removeQuestionsFromCategory,
    addFavouriteQuestion,
    removeFavouriteQuestion,
    onFavouriteQuestionsChange
  }, dispatch);
}

const withConnect =  connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withQuestionCategory,
  withCurrentQuestion,
  withFavouriteQuestion
)(withConnect);

export default enhancedQuestionDetailPage;
