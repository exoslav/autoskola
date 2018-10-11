import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LicenseCategoryItem extends React.PureComponent {
  render() {
    const { name, licenseId, icon, link } = this.props;

    return (
      <li>
        <Link to={link}>
          <FontAwesomeIcon icon={icon} />
          <h3>{name}</h3>
          <strong>{licenseId}</strong>
        </Link>
      </li>
    );
  }
}

LicenseCategoryItem.defaultProps = {
  categoryItem: null
};

LicenseCategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  licenseId: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default LicenseCategoryItem;
