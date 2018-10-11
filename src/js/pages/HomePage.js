import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TestsByLicenseCategoryContainer from '../components/TestsByLicenseCategoryContainer';

class HomePage extends React.Component {
  constructor() {
    super();

    console.log('New HomePage.js');
  }
  render() {
    return (
      <TestsByLicenseCategoryContainer />
    );
  }
}

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export default HomePage;
