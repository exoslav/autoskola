import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import TestsByQuestionFields  from './TestsByQuestionFields';

class TestsByQuestionFieldsContainer extends React.Component {
  render() {
    return (
      <TestsByQuestionFields questionFields={this.props.questions} />
    );
  }
}

TestsByQuestionFieldsContainer.defaultProps = {
  questions: []
};

TestsByQuestionFieldsContainer.propTypes = {
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

export default connect(mapStateToProps)(TestsByQuestionFieldsContainer);
