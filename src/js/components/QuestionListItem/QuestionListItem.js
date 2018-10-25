import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class QuestionListItem extends React.PureComponent {
  render() {
    const { id, question, link } = this.props;

    return (
      <li>
        <Link to={link}>
          <strong>{id}</strong>
          <span> - </span>
          <span>{question}</span>
        </Link>
      </li>
    );
  }
}

QuestionListItem.propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default QuestionListItem;
