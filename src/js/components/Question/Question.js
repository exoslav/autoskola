import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionTitle.scss';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import AnswerListItem from '../AnswerListItem/AnswerListItem';

class Question extends PureComponent {
  render() {
    const { bold, answers, questionId, questionText, answered, correct, onAnswerClick } = this.props;

    return (
      <div className="question">
        <QuestionTitle
          bold={bold}
          questionText={questionText}
          answered={answered}
          correct={correct}
        />

        {
          answers.length &&
          <ol>
            {
              answers.map((answer, index) => (
                <AnswerListItem
                  key={index}
                  index={index}
                  questionId={questionId}
                  answer={answer}
                  answered={this.props.answeredIndex === index}
                  onItemClick={onAnswerClick}
                />
              ))
            }
          </ol>
        }
      </div>
    );
  }
}

Question.defaultProps = {
  bold: false,
  answered: false,
  correct: false,
  answeredIndex: null,
  onAnswerClick: () => {}
};

Question.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  answered: PropTypes.bool,
  answeredIndex: PropTypes.number,
  correct: PropTypes.bool,
  bold: PropTypes.bool,
  onAnswerClick: PropTypes.func
};

export default Question;
