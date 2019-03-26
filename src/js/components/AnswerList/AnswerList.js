import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withStateHandlers } from 'recompose';

import AnswerItem from './AnswerItem'

import './AnswerList.scss';

const shouldShowIcon = (answeredCorrectly, selectedAnswer, correctAnswer, currentQuestionIndex) => {
  // user selected correct answer
  if (answeredCorrectly && selectedAnswer === currentQuestionIndex) {
    return true;
  }
  // user selected wrong answer
  else if (
    !answeredCorrectly && selectedAnswer &&
    ((selectedAnswer === currentQuestionIndex) || (correctAnswer === currentQuestionIndex))
  ) {
    return true;
  }

  return false;
}

const AnswerList = ({
  answers,
  correct,
  showIcon,
  correctAnswer,
  onAnswerClick,
  selectedAnswer,
  answeredCorrectly
}) => (
  <ol className="answer-list">
    {
      answers.map((answer, index) => (
        <AnswerItem
          count={index + 1}
          text={answer}
          correct={
            answeredCorrectly
              ? index + 1 === selectedAnswer
              : selectedAnswer && correctAnswer + 1 === index + 1
          }
          showIcon={shouldShowIcon(answeredCorrectly, selectedAnswer, correctAnswer + 1, index + 1)}
          onAnswerClick={onAnswerClick}
          answerIndex={index + 1}
          answered={!!selectedAnswer}
        />
      ))
    }
  </ol>
);

AnswerList.defaultProps = {
  answers: [],
  correctAnswer: null
};

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape()
  ),
  correctAnswer: PropTypes.number
};

const defaultState = {
  selectedAnswer: 0,
  answeredCorrectly: false
};

export default compose(
  withStateHandlers(
    defaultState,
    {
      onAnswerClick: (state, props) => (answerIndex) => {
        const selectedAnswer = state.selectedAnswer;
        if (selectedAnswer !== 0) {
          return;
        }

        return {
          selectedAnswer: answerIndex,
          answeredCorrectly: props.correctAnswer + 1 === answerIndex
        };
      },
      setDefaultState: () => () => (defaultState)
    }
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.questionId !== prevProps.questionId) {
        this.props.setDefaultState();
      }
    }
  })
)(AnswerList);
