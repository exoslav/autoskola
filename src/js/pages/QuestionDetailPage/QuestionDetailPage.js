import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import css from './QuestionDetailPage.scss';

import compose from '../../utils/compose';
import AnswerListItem from '../../components/AnswerListItem/AnswerListItem';
import LoginAdvantages from '../../components/LoginAdvantages/LoginAdvantages';
import QuestionInterface from '../../components/QuestionInterface/QuestionInterface';
import Loader from '../../components/Loader/Loader';
import withQuestion from './withQuestion';
import withCurrentQuestion from './withCurrentQuestion';
import withUser from '../../components/hoc/withUser';
import withFavouriteQuestionResourcer from '../../components/hoc/withFavouriteQuestionResourcer';
import {
  getQuestion,
  removeQuestionFromCategory
} from '../../redux/reducers/questionsReducer';
import {
  saveQuestion,
  addFavouriteQuestion,
  removeFavouriteQuestion,
  removeFavouriteQuestionFromState
} from '../../redux/reducers/favouriteQuestionsReducer';

class QuestionDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAnswer: null
    };

    this.onNoteClick = this.onNoteClick.bind(this);
    this.onFavouriteClick = this.onFavouriteClick.bind(this);
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

  onNoteClick(note) {
    const { user, match, question, saveQuestion, removeFavouriteQuestion } = this.props;

    if (!user) {
      return;
    }

    if (
      !note &&
      !question.favourite
    ) {
      removeFavouriteQuestion(
        match.params.questionId,
        user.uid
      );
    } else {
      saveQuestion(
        {
          ...question,
          note,
          categoryId: match.params.categoryId
        },
        user.uid
      );
    }
  }

  onFavouriteClick(favourite) {
    const { user, match, question, saveQuestion, removeFavouriteQuestion } = this.props;

    if (!user) {
      return;
    }

    if (
      !favourite &&
      !question.note
    ) {
      removeFavouriteQuestion(
        match.params.questionId,
        user.uid
      );
    } else {
      saveQuestion(
        {
          ...question,
          favourite,
          categoryId: match.params.categoryId
        },
        user.uid
      );
    }
  }

  render() {
    const { question, favouriteQuestionLoading, user } = this.props;

    return (
      <Fragment>
        <div className="question-detail__wrapper">
          <div className="question-detail__question">
            <div className="question-detail__question__title-wrapper">
              <h1 className="question-detail__question__title">{`Otázka číslo: ${this.props.match.params.questionId}`}</h1>
              {
                question && <strong className="answer__title">{question.question}</strong>
              }
            </div>

            {
              !question &&
              <div className="question-detail__loader">
                <Loader/>
                <p className="question-detail__loader__label">{`Načítá se otázka ${this.props.match.params.questionId}`}</p>
              </div>
            }

            {
              question &&
              <ol className="answers-list">
                {
                  question.answers.map((answer, index) => (
                    <AnswerListItem
                      key={index}
                      index={index}
                      answer={answer}
                    />
                  ))
                }
              </ol>
            }
          </div>

          <div className="question-detail__box-right">
            {
              !user && <LoginAdvantages/>
            }

            {
              user &&
              <QuestionInterface
                loading={favouriteQuestionLoading}
                note={question && question.note || ''}
                favourite={question && question.favourite || false}
                onNoteClick={this.onNoteClick}
                onFavouriteClick={this.onFavouriteClick}
              />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

QuestionDetailPage.defaultProps = {
  question: null
};

QuestionDetailPage.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    note: PropTypes.string,
    favourite: PropTypes.bool
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestion,
    saveQuestion,
    removeQuestionFromCategory,
    addFavouriteQuestion,
    removeFavouriteQuestion,
    removeFavouriteQuestionFromState
  }, dispatch);
}

const withConnect =  connect(null, mapDispatchToProps)(QuestionDetailPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withCurrentQuestion,
  withFavouriteQuestionResourcer,
  withQuestion
)(withConnect);

export default enhancedQuestionDetailPage;
