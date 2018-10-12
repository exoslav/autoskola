import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TestsByLicenseCategoryContainer from '../components/TestsByLicenseCategoryContainer';
import TestsByQuestionFieldsContainer from '../components/TestsByQuestionFields/TestsByQuestionFieldsContainer';

class HomePage extends React.Component {
  render() {
    return (
      <Fragment>
        <TestsByQuestionFieldsContainer />
        <TestsByLicenseCategoryContainer />
      </Fragment>
    );
  }
}

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export default HomePage;
