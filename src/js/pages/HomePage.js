import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TestsByLicenseCategoryContainer from '../components/TestsByLicenseCategoryContainer';
import DrivingFieldsContainer from '../components/DrivingFields/DrivingFieldsContainer';

class HomePage extends React.Component {
  render() {
    return (
      <Fragment>
        <DrivingFieldsContainer />
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
