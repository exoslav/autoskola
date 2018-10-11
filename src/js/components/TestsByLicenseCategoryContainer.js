import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import TestsByLicenseCategory  from './TestsByLicenseCategory';

class TestsByLicenseCategoryContainer extends React.Component {
  render() {
    return (
      <TestsByLicenseCategory licenseCategories={this.props.licenseCategories} />
    );
  }
}

TestsByLicenseCategoryContainer.defaultProps = {
  licenseCategories: []
};

TestsByLicenseCategoryContainer.propTypes = {
  licenseCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      licenseId: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

const mapStateToProps = (state) => {
  return {
    licenseCategories: state.licenseCategories
  };
}

export default connect(mapStateToProps)(TestsByLicenseCategoryContainer)

