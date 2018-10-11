import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


class TestPage extends React.Component {
  constructor() {
    super();

    console.log('New TestPage.js');
  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
        <p>{this.props.match.params.id}</p>
      </Fragment>
    );
  }
}

TestPage.defaultProps = {
};

TestPage.propTypes = {
};

export default TestPage;
