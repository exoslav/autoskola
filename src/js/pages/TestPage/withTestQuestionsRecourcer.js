import React from 'react';

import Firebase from '../../firebase'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default (BaseComponent) => {
  class withQueryStringHandler extends React.Component {
    constructor() {
      super();

      this.state = ({
        questions: []
      });

      this.IDS = {
        'pravidla-provozu': [
          "06040299","06050373","06050386","06050396","06050398",
          "06050401","06050402","06050409","06050410","06050412",
          "06050414","06050415","06050419","06050638","06060071",
          "06060072","06060074","06060075","06060079","06060211",
          "06060212","06060323","06060327","06060342","06060381",
          "06060386","06060392","06060393","06060394","06060467"
        ]
      };
    }

    componentDidMount() {
      if (!this.props.testOptionsError && this.props.testOptions) {
        this.fetchQuestions(this.props.testOptions);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.questions.length > 0) {
        return;
      }

      if (!this.props.testOptionsError && this.props.testOptions) {
        this.fetchQuestions(this.props.testOptions);
      }
    }

    fetchQuestions(opts) {
      const ids = this.IDS[opts.category];
      const limit = opts.count > ids.length
        ? ids.length : opts.count;
      const shuffled = shuffle(ids).slice(0, limit);
      const promises = shuffled.map(id => Firebase.getQuestionById(id));

      Promise.all(promises)
        .then(docs => {
          this.setState({ questions: docs.map(doc => doc.data()) });
        });
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          questions={this.state.questions}
        />
      );
    }
  }

  return withQueryStringHandler;
}
