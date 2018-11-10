import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './DrivingFieldsItem.scss';

class DrivingFieldsItem extends React.PureComponent {
  render() {
    const { name, icon, link } = this.props;

    return (
      <li className="driving-fields__item">
        <Link
          to={link}
          className="driving-fields__link"
        >
          <FontAwesomeIcon
            className="driving-fields__icon"
            icon={icon}
          />
          <div className="driving-fields__title-wrap">
            <span className="driving-fields__title">{name}</span>
          </div>
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
  link: PropTypes.string.isRequired
};

export default DrivingFieldsItem;
