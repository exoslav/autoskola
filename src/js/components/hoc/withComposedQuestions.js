import React from 'react';

export default (BaseComponent) => {
  class withComposedQuestions extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        questions: props.questions
      };
    }

    componentDidMount() {
      console.log('with composed questions component mounted');
    }

    componentWillUnmount() {
      console.log('with composed questions component is about to unmount');
    }

    componentDidUpdate(prevProps) {
      const {
        user,
        questions, questionsLoading,
        savedQuestions, savedQuestionsLoading
      } = this.props;

      if (user) {
        const questionsExists = questions.length > 0;
        const savedQuestionsExists = savedQuestions.length > 0;

        if (
          // if savedQuestion does not exists
          !savedQuestionsExists &&
          !savedQuestionsLoading && prevProps.savedQuestionsLoading
        ) {
          this.setState({ questions });
        } else if (
          questionsLoading !== prevProps.questionsLoading ||
          savedQuestionsLoading !== prevProps.savedQuestionsLoading
        ) {
          // when currentQuestion and favouroteQuestion both exits (wait both are loaded)
          if (savedQuestionsExists && questionsExists) {
            const savedQuestionsAsObject = mapSavedQuestionsToObject(savedQuestions);
            this.setState({
              questions: questions.map(q => {
                if (savedQuestionsAsObject[q.id]) {
                  return {
                    ...q,
                    favourite: savedQuestionsAsObject[q.id].favourite || false,
                    note: savedQuestionsAsObject[q.id].note || '',
                  };
                }

                return q;
              })
            });
          }
        }
      } else {
        if (questions !== prevProps.questions) {
          this.setState({ questions });
        }
      }
    }

    render() {
      console.log('with composed questions component render');
      return (
        <BaseComponent
          {...this.props}
          questions={this.state.questions}
        />
      );
    }
  }

  return withComposedQuestions;
}

function mapSavedQuestionsToObject(savedQuestions) {
  return savedQuestions.reduce((prev, curr) => {
    if (!prev[curr.id]) {
      return {
        ...prev,
        [curr.id]: {
          favourite: curr.favourite,
          note: curr.note
        }
      };
    }

    return prev;
  }, {});
}

