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

  const mapStateToProps = (state, props) => {
    const currentQuestion = props.questionCategoryItems.find(q => q.id === Number(props.match.params.questionId));

    return { currentQuestion };
  }

  return connect(mapStateToProps)(withCurrentQuestion);
}
