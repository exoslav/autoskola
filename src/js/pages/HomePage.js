import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import allQuestions from '../redux/sady-otazek/pravidla-provozu-na-pozemnich-komunikacich';
import deployQuestions from '../firebase/scripts/deployQuestions';

import TestsByLicenseCategoryContainer from '../components/TestsByLicenseCategoryContainer';
import DrivingFieldsContainer from '../components/DrivingFields/DrivingFieldsContainer';

class HomePage extends React.Component {
  constructor() {
    super();

    this.deployQuestions = this.deployQuestions.bind(this);
  }

  componentDidUnmout() {
    console.log('homepage component did unmout');
  }

  deployQuestions() {
    deployQuestions(allQuestions.slice(0, 30));
  }

  render() {
    console.log('homepage component render')
    return (
      <Fragment>
        <button
          type="button"
          onClick={() => this.deployQuestions()}
        >
          Deploy
        </button>
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
