import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuestionFieldsItem extends React.PureComponent {
  render() {
    const { name, icon, link } = this.props;

    return (
      <li>
        <Link to={link}>
          <FontAwesomeIcon icon={icon} />
          <h3>{name}</h3>
        </Link>
      </li>
    );
  }
}

QuestionFieldsItem.defaultProps = {
  categoryItem: null
};

QuestionFieldsItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default QuestionFieldsItem;
