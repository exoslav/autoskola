import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DrivingFieldsItem.scss';

class DrivingFieldsItem extends React.PureComponent {
  render() {
    const { name, icon, link, totalQuestions } = this.props;

    return (
      <li className="driving-fields__item">
        <Link
          to={link}
          className="driving-fields__link"
        >
          <div className="driving-fields__title-wrap">
            <FontAwesomeIcon
              className="driving-fields__icon"
              icon={icon}
            />
            <span className="driving-fields__title">{name}</span>
          </div>

          <span className="driving-fields__total-questions">Celkem <strong>{totalQuestions}</strong> otázek</span>
        </Link>
      </li>
    );
  }
}

DrivingFieldsItem.defaultProps = {
  categoryItem: null
};

DrivingFieldsItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  totalQuestions: PropTypes.number.isRequired
};

export default DrivingFieldsItem;
