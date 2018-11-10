import React from 'react';

export default (BaseComponent) => {
  class withQuestion extends React.Component {
    constructor() {
      super();

      this.state = {
        question: null
      };
    }

    componentDidUpdate(prevProps) {
      const {
        user,
        currentQuestion, currentQuestionLoading,
        favouriteQuestion, favouriteQuestionLoading
      } = this.props;

      if (user) {
        if (
          // if favouriteQuestion does not exists
          !favouriteQuestion &&
          !favouriteQuestionLoading && prevProps.favouriteQuestionLoading
        ) {
          this.setState({
            question: currentQuestion
          });
        } else if (
          currentQuestionLoading !== prevProps.currentQuestionLoading ||
          favouriteQuestionLoading !== prevProps.favouriteQuestionLoading
        ) {
          // when currentQuestion and favouroteQuestion both exits (aka wait both are loaded)
          if (favouriteQuestion && currentQuestion) {
            this.setState({
              question: favouriteQuestion
            });
          }
        }
      } else {
        if (this.props.currentQuestion !== prevProps.currentQuestion) {
          this.setState({
            question: currentQuestion
          });
        }
      }
    }

    render() {
      return (
        <BaseComponent
          user={this.props.user}
          match={this.props.match}
          question={this.state.question}
          favouriteQuestionLoading={this.props.favouriteQuestionLoading}
        />
      );
    }
  }

  return withQuestion;
}
