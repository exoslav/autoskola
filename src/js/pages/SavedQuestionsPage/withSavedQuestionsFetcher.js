import React from 'react';
import { connect } from 'react-redux';

import FirebaseActions from '../../firebase';

export default (BaseComponent) => {
  class withSavedQuestionsFetcher extends React.Component {
    constructor() {
      super();

      this.state = {
        questions: [],
        questionsLoading: false
      };

      this.fetchSavedQuestionsWithQuestions = this.fetchSavedQuestionsWithQuestions.bind(this);
    }

    componentDidMount() {
      this.fetchSavedQuestionsWithQuestions();
    }

    componentDidUpdate(prevProps) {
      if (this.props.savedQuestions !== prevProps.savedQuestions) {
        this.fetchSavedQuestionsWithQuestions();
      }
    }

    fetchSavedQuestionsWithQuestions () {
      const savedQuestions = this.props.savedQuestions;

      this.setState({ questionsLoading: true });

      if (savedQuestions.length > 0) {
        const promises = savedQuestions.map(q => FirebaseActions.getQuestionById(q.id));

        Promise.all(promises)
          .then((questions) => {
            this.setState({
              questions: questions.map(q => q.data()),
              questionsLoading: false
            });

          });
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          questions={this.state.questions}
          questionsLoading={this.state.questionsLoading}
        />
      );
    }
  }

  return connect(null, null)(withSavedQuestionsFetcher);
}
