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
import withUser from '../../components/hoc/withUser';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSingleQuestionResourcer from '../../components/hoc/withSingleQuestionResourcer';
import withSavedQuestionsResourcer from '../../components/hoc/withSavedQuestionsResourcer';
import {
  getQuestionById,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import {
  saveQuestion,
  deleteSavedQuestion,
  removeSavedQuestionsFromState
} from '../../redux/reducers/savedQuestionsReducer';

class QuestionDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAnswer: null
    };

    this.handleSaveQuestion = this.handleSaveQuestion.bind(this);
  }

  handleSaveQuestion(note, favourite) {
    const { user, questions, saveQuestion, deleteSavedQuestion } = this.props;

    if (!user) {
      return;
    }

    const question = questions[0];

    if (!note && !favourite) {
      deleteSavedQuestion(question.id, user.uid);
      return;
    }

    saveQuestion(
      {
        note,
        favourite,
        id: question.id
      },
      user.uid
    );
  }

  render() {
    console.log(window.test);
    window.test = false;
    console.log('question detail page render');
    const { questions, savedQuestionsLoading, user, questionId } = this.props;
    console.log(questions);
    const question = questions[0];

    return (
      <Fragment>
        <div className="question-detail__wrapper">
          <div className="question-detail__question">
            <div className="question-detail__question__title-wrapper">
              <h1 className="question-detail__question__title">{`Otázka číslo: ${questionId}`}</h1>
              {
                question && <strong className="answer__title">{question.question}</strong>
              }
            </div>

            {
              !question &&
              <div className="question-detail__loader">
                <Loader/>
                <p className="question-detail__loader__label">{`Načítá se otázka ${questionId}`}</p>
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
                loading={savedQuestionsLoading}
                note={question && question.note || ''}
                favourite={question && question.favourite || false}
                onSaveQuestion={this.handleSaveQuestion}
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
    getQuestionById,
    saveQuestion,
    removeQuestionsFromCategory,
    deleteSavedQuestion,
    removeSavedQuestionsFromState
  }, dispatch);
}

const withConnect =  connect(null, mapDispatchToProps)(QuestionDetailPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withSingleQuestionResourcer,
  withSavedQuestionsResourcer,
  withComposedQuestions
)(withConnect);

export default enhancedQuestionDetailPage;
