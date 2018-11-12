import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './AnswerListItem.scss';

class AnswerListItem extends PureComponent {
  constructor() {
    super();

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    this.props.onItemClick(this.props.answer, this.props.index);
  }

  render() {
    const { answer, index, answered } = this.props;

    return (
      <li
        key={index}
        onClick={this.onItemClick}
        className={`answers-list__answer-item
          ${answered ? ' answers-list__answer-item--answered' : ''}`}
      >
        <span className="answers-list__answer-index">{index}</span>
        <span className="answers-list__answer-text">{answer}</span>
      </li>
    );
  }
}

AnswerListItem.defaultProps = {
  answered: false,
  onItemClick: () => {}
};

AnswerListItem.propTypes = {
  index: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  answered: PropTypes.bool,
  onItemClick: PropTypes.func
};

export default AnswerListItem;
