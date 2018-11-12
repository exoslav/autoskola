import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './TestThumbListItem.scss';

class TestThumbListItem extends PureComponent {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onItemClick(this.props.id);
  }

  render() {
    const { index, active, answered, questionText, onItemClick } = this.props;

    return (
      <li
        className={`
          test__thumb-list__item
          ${active ? ' test__thumb-list__item--active ' : ' '}
          test__thumb-list__item--${answered ? 'answered' : 'unanswered'}`}
        onClick={this.handleOnClick}
      >
        <span className="test__thumb-list__item__index">{index}</span>
        <span className="test__thumb-list__item__name">{questionText}</span>
      </li>
    );
  }
}

TestThumbListItem.defaultProps = {
  active: false,
  answered: false,
  onItemClick: () => {}
};

TestThumbListItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  active: PropTypes.bool,
  answered: PropTypes.bool,
  onItemClick: () => {}
};

export default TestThumbListItem;
