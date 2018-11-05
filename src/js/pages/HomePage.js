import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TestsByLicenseCategoryContainer from '../components/TestsByLicenseCategoryContainer';
import DrivingLicencesContainer from '../components/DrivingLicences/DrivingLicencesContainer';

class HomePage extends React.Component {
  render() {
    return (
      <Fragment>
        <DrivingLicencesContainer />
        {/* <TestsByLicenseCategoryContainer /> */}
      </Fragment>
    );
  }
}

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export default HomePage;
