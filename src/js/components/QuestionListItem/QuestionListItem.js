import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './QuestionListItem.scss';

import Icon from '../Icon/Icon';

class QuestionListItem extends React.PureComponent {
  render() {
    const { id, question, link, note, favourite } = this.props;

    return (
      <li className="question-list-item">
        <Link
          to={link}
          className="question-list-item__link"
        >
          <strong className="question-list-item__item-id">{id}</strong>
          <span className="question-list-item__title">{question}</span>

          {
            (favourite || note) &&
            <span className="question-list-item__icons">
              {
                note &&
                <Icon
                  classNames="note"
                  icon={[note ? 'fas' : 'far', 'sticky-note']}
                />
              }

              {
                favourite &&
                <Icon
                  classNames="star"
                  icon={[favourite ? 'fas' : 'far', 'star']}
                />
              }
            </span>
          }
        </Link>
      </li>
    );
  }
}

QuestionListItem.defaultProps = {
  favourite: false,
  note: false
};

QuestionListItem.propTypes = {
  favourite: PropTypes.bool,
  note: PropTypes.bool,
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default QuestionListItem;
