import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import TestsByQuestionFields  from './TestsByQuestionFields';

class TestsByQuestionFieldsContainer extends React.Component {
  render() {
    return (
      <TestsByQuestionFields questionFields={this.props.questionFields} />
    );
  }
}

TestsByQuestionFieldsContainer.defaultProps = {
  questionFields: []
};

TestsByQuestionFieldsContainer.propTypes = {
  questionFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

const mapStateToProps = (state) => {
  return {
    questionFields: state.questionFields
  };
}

export default connect(mapStateToProps)(TestsByQuestionFieldsContainer);
