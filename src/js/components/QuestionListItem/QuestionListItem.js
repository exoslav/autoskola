import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './QuestionListItem.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuestionListItem extends React.PureComponent {
  render() {
    const { id, question, link } = this.props;

    return (
      <li className="question-list-item">
        <Link
          to={link}
          className="question-list-item__link"
        >
          <strong className="question-list-item__item-id">{id}</strong>
          <span className="question-list-item__title">{question}</span>

          {
            this.props.favourite &&
            <span className="question-list-item__icons">
              <FontAwesomeIcon
                className="question-list-item__icon-favourite"
                icon={[this.props.favourite ? 'fas' : 'far', 'star']}
              />
            </span>
          }
        </Link>
      </li>
    );
  }
}

QuestionListItem.propTypes = {
  favourite: PropTypes.bool,
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default QuestionListItem;
