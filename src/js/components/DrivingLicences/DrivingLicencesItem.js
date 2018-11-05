import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './DrivingLicencesItemStyles.scss';

class QuestionFieldsItem extends React.PureComponent {
  render() {
    const { name, icon, link } = this.props;

    return (
      <li className="driving-licenses__item">
        <Link
          to={link}
          className="driving-licenses__link"
        >
          <FontAwesomeIcon
            className="driving-licenses__icon"
            icon={icon}
          />
          <h3 className="driving-licenses__title">{name}</h3>
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
