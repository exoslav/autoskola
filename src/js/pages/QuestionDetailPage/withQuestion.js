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
        savedQuestions, savedQuestionsLoading
      } = this.props;

      if (user) {
        const savedQuestionsExists = !!savedQuestions.length;

        if (
          // if savedQuestion does not exists
          !savedQuestionsExists &&
          !savedQuestionsLoading && prevProps.savedQuestionsLoading
        ) {
          this.setState({
            question: currentQuestion
          });
        } else if (
          currentQuestionLoading !== prevProps.currentQuestionLoading ||
          savedQuestionsLoading !== prevProps.savedQuestionsLoading
        ) {
          // when currentQuestion and favouroteQuestion both exits (wait both are loaded)
          if (savedQuestionsExists && currentQuestion) {
            this.setState({
              question: {
                ...currentQuestion,
                ...savedQuestions.filter(q => q.id === currentQuestion.id)[0]
              }
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
          savedQuestionsLoading={this.props.savedQuestionsLoading}
        />
      );
    }
  }

  return withQuestion;
}
