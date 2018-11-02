import React from 'react';
import { connect } from 'react-redux'

export default (BaseComponent) => {
  class withCurrentQuestion extends React.Component {
    render() {
      return (
        <BaseComponent
          {...this.props}
          currentQuestion={this.props.currentQuestion}
        />
      );
    }
  }

  const mapStateToProps = (state) => {
    return { currentQuestion: state.questions.currentQuestion };
  }

  return connect(mapStateToProps)(withCurrentQuestion);
}
