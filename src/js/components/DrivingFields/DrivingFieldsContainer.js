import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import DrivingLicences  from './DrivingFields';

class DrivingFieldsContainer extends React.Component {
  render() {
    return (
      <DrivingLicences questionFields={this.props.questions} />
    );
  }
}

DrivingFieldsContainer.defaultProps = {
  questions: []
};

DrivingFieldsContainer.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.items
  };
}

export default connect(mapStateToProps)(DrivingFieldsContainer);
