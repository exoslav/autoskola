import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';

import './QuestionDetailPage.scss';

import Container from '../../components/Container/Container';
import AnswerList from '../../components/AnswerList/AnswerList';
import LoginAdvantages from '../../components/LoginAdvantages/LoginAdvantages';
import QuestionInterface from '../../components/QuestionInterface/QuestionInterface';
import LoaderLogo from '../../components/LoaderLogo/LoaderLogo';
import withUser from '../../components/hoc/withUser';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSingleQuestionResourcer from '../../components/hoc/withSingleQuestionResourcer';
import withSavedQuestionsResourcer from '../../components/hoc/withSavedQuestionsResourcer';
import withKeyboardHandlers from '../../components/hoc/withKeyboardHandlers';
import {
  getQuestionById,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import {
  saveQuestion,
  deleteSavedQuestion,
  removeSavedQuestionsFromState
} from '../../redux/reducers/savedQuestionsReducer';
import LabelTag from '../../components/LabelTag/LabelTag'
import Button from '../../components/Button/Button'
import { Redirect } from 'react-router-dom'

const QuestionDetailPage = ({
  questionId,
  questions,
  savedQuestionsLoading,
  user,
  redirectTo,
  handleSaveQuestion,
  onRedirectButtonClick,
  questionsLoading
}) => {
  const question = questions[0];

  return (
    <div className="question-detail">

      <div className="question-detail__question">
        <Container classNames="question-detail__title-container">
          <div className="question-detail__title-wrapper">
            {
              question &&
              <h1 className="question-detail__title">{question.question}</h1>
            }
          </div>

          <div className="question-detail__box-right">
            <div className="question-detail__interface">
              {
                !user && <LoginAdvantages/>
              }

              {
                user &&
                <QuestionInterface
                  loading={savedQuestionsLoading}
                  note={question && question.note || ''}
                  favourite={question && question.favourite || false}
                  onSaveQuestion={handleSaveQuestion}
                />
              }

              <div className="question-detail__buttons">
                {
                  question && question.prevQuestion &&
                  <Button
                    text="Předešlá otázka"
                    classNames={['question-detail__prev-button', 'button--white']}
                    icon="chevron-left"
                    iconPosition="left"
                    onButtonClick={() => onRedirectButtonClick(question.prevQuestion)}
                  />
                }

                {
                  question && question.nextQuestion &&
                  <Button
                    text="Další otázka"
                    classNames={['button--white']}
                    icon="chevron-right"
                    iconPosition="right"
                    onButtonClick={() => onRedirectButtonClick(question.nextQuestion)}
                  />
                }

                {
                  redirectTo &&
                  <Redirect
                    push
                    to={`/otazky/pravidla-provozu/${redirectTo}`}
                  />
                }
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container classNames={"question-detail__content-container"}>
        <div className="question-detail__content">
          {
            questionsLoading &&
            <LoaderLogo
              text={`Načítá se otázka #${questionId}`}
              classNames="question-detail__loader-logo"
            />
          }

          {
            question &&
            <AnswerList
              answers={question.answers}
              correctAnswer={question.correctAnswer}
              questionId={question.id}
            />
          }

          {
            question &&
            <div className="question-detail__labels">
              <LabelTag
                classNames="question-detail__label question-detail__points-label"
                label={<span>Počet bodů za tuto otázku: <strong>{question.points}</strong></span>}
              />
              <LabelTag
                classNames="question-detail__label"
                label={<span>Kód otázky: <strong>{question.id}</strong></span>}
              />
              <LabelTag
                classNames="question-detail__label question-detail__category-label"
                label={<span>Kategorie otázky: <strong>{question.category}</strong></span>}
              />
            </div>
          }
        </div>
      </Container>
    </div>
  );
}

QuestionDetailPage.defaultProps = {
  question: null,
  redirectTo: null,
  handleSaveQuestion: () => {},
  onRedirectButtonClick: () => {}
};

QuestionDetailPage.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    note: PropTypes.string,
    favourite: PropTypes.bool,
    prevQuestion: PropTypes.string,
    nextQuestion: PropTypes.string
  }),
  redirectTo: PropTypes.string,
  handleSaveQuestion: PropTypes.func,
  onRedirectButtonClick: PropTypes.func
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

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
  withSingleQuestionResourcer,
  withSavedQuestionsResourcer,
  withComposedQuestions,
  withStateHandlers(
    { redirectTo: null },
    {
      onRedirectButtonClick: (props) => (questionId) => ({ redirectTo: questionId })
    }

  ),
  withHandlers({
    handleSaveQuestion: (props) => (note, favourite) => {
      const { user, questions, saveQuestion, deleteSavedQuestion } = props;

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
  }),
  withKeyboardHandlers({
    arrowLeftCallback: props => props.onRedirectButtonClick(props.questions[0].prevQuestion),
    arrowRightCallback: props => props.onRedirectButtonClick(props.questions[0].nextQuestion)
  })
)(QuestionDetailPage);
