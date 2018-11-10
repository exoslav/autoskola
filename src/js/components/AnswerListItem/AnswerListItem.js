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
    const { answer, index } = this.props;

    return (
      <li
        key={index}
        onClick={this.onItemClick}
        className="answers-list__answer-item"
      >
        <span className="answers-list__answer-index">{index}</span>
        <span className="answers-list__answer-text">{answer}</span>
      </li>
    );
  }
}

AnswerListItem.defaultProps = {
  onItemClick: () => {}
};

AnswerListItem.propTypes = {
  index: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  onItemClick: PropTypes.func
};

export default AnswerListItem;
