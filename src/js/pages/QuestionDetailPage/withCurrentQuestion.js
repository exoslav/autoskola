import React from 'react';
import { connect } from 'react-redux'

export default (BaseComponent) => {
  class withCurrentQuestion extends React.Component {
    render() {
      return (
        <BaseComponent
          {...this.props}
          currentQuestion={this.props.currentQuestion}
          currentQuestionLoading={this.props.currentQuestionLoading}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    const category = state.questions.items.filter(category => (
      category.id === props.match.params.categoryId
    ))[0];

    return {
      currentQuestion: category.questions.length > 0
        ? category.questions[0] : null,
      currentQuestionLoading: state.questions.fetching
    };
  }

  return connect(mapStateToProps)(withCurrentQuestion);
}
