import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionTitle.scss';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import AnswerListItem from '../AnswerListItem/AnswerListItem';

class Question extends PureComponent {
  render() {
    const { bold, answers, questionText, onAnswerClick } = this.props;

    return (
      <div className="question">
        <QuestionTitle
          bold={bold}
          questionText={questionText}
        />

        {
          answers.length &&
          <ol>
            {
              answers.map((answer, index) => (
                <AnswerListItem
                  key={index}
                  index={index}
                  answer={answer}
                  answered={answer.answered}
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
  onAnswerClick: () => {}
};

Question.propTypes = {
  questionText: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  bold: PropTypes.bool,
  onAnswerClick: PropTypes.func
};

export default Question;
