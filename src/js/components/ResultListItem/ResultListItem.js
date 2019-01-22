import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './ResultListItem.scss';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import AnswerListItem from '../AnswerListItem/AnswerListItem';

class ResultListItem extends PureComponent {
  render() {
    const { bold, answers, questionId, questionText, answered, correct, onAnswerClick } = this.props;

    return (
      <li className={`result-list-item result-list-item--${correct ? 'correct' : 'incorrect'}`}>
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
      </li>
    );
  }
}

ResultListItem.defaultProps = {
  bold: false,
  answered: false,
  answeredIndex: null,
  correct: false,
  onAnswerClick: () => {}
};

ResultListItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  answered: PropTypes.bool,
  answeredIndex: PropTypes.number,
  correct: PropTypes.bool,
  bold: PropTypes.bool,
  onAnswerClick: PropTypes.func
};

export default ResultListItem;
