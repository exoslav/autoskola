import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps, withHandlers } from 'recompose';

import Icon from '../Icon/Icon';

import './AnswerItem.scss';

const AnswerItem = ({
  count,
  text,
  handleOnClick,
  answerOk,
  answerNotOk,
  answered
}) => (
  <li
    className={`
      answer-item
      ${answered ? ' answer-item--with-icon' : ''}
      ${answerOk ? 'answer-item--ok' : ''}
      ${answerNotOk ? 'answer-item--not-ok' : ''}
    `}
    onClick={handleOnClick}
  >
    {
      answerOk &&
      <Icon
        customClassName="answer-item__icon"
        icon="check"
      />
    }

    {
      answerNotOk &&
      <Icon
        customClassName="answer-item__icon"
        icon="times"
      />
    }

    <span className="answer-item__index">{count}</span>
    <span className="answer-item__answer-text">{text}</span>
  </li>
);

AnswerItem.defaultProps = {
  correct: false,
  answerOk: false,
  answerNotOk: false,
  answered: false
};

AnswerItem.propTypes = {
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  answerIndex: PropTypes.bool.isRequired,
  correct: PropTypes.bool,
  answerOk: PropTypes.bool,
  answerOkNot: PropTypes.bool,
  answered: PropTypes.bool
};

export default compose(
  pure,
  withHandlers({
    handleOnClick: (props) => () => props.onAnswerClick(props.answerIndex)
  }),
  withProps(({ showIcon, correct }) => ({
    answerOk: showIcon && correct,
    answerNotOk: showIcon && !correct
  }))
)(AnswerItem);
