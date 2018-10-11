import React from 'react';
import PropTypes from 'prop-types';

import LicenseCategoryItem  from './LicenseCategoryItem';

class TestsByLicenseCategory extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Vyberte si testy dle kategorie řidičského oprávnění</h2>

        {
          this.props.licenseCategories.length > 0 &&
          <ul>
            {
              this.props.licenseCategories.map((categoryItem, index) => {
                const {name, licenseId, icon, link} = categoryItem;

                return <LicenseCategoryItem
                  key={licenseId}
                  name={name}
                  licenseId={licenseId}
                  icon={icon}
                  link={link}
                />
              })
            }
          </ul>
        }
      </React.Fragment>
    );
  }
}

TestsByLicenseCategory.defaultProps = {
  licenseCategories: []
};

TestsByLicenseCategory.propTypes = {
  licenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      licenseId: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default TestsByLicenseCategory;
