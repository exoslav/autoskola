import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import queryString  from 'query-string';

import css  from './TestPageStyles.scss';

import compose from '../../utils/compose';
import withUser from '../../components/hoc/withUser';
import TestPage from './TestPage';
import {
  getQuestions,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import { saveTest } from '../../redux/reducers/testReducer';

class TestPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      showResults: false,
      activeQuestion: null,
      activeQuestionIndex: 0,
      answeredQuestions: []
    }

    this.onSaveTest = this.onSaveTest.bind(this);
    this.onTestEvaluation = this.onTestEvaluation.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  componentDidMount() {
    const { kategorie } = queryString.parse(this.props.location.search);

    this.props.getQuestions(kategorie);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questions !== prevProps.questions) {
      const { questions } = this.props;

      this.setState((prevState) => ({
        questions: questions,
        activeQuestion: questions[prevState.activeQuestionIndex]
      }));
    }
  }

  componentWillUnmount() {
    const { kategorie } = queryString.parse(this.props.location.search);

    this.props.removeQuestionsFromCategory(kategorie);
  }

  setActiveQuestion(questionId) {
    this.setState(prevState => ({
      questions: prevState.questions.map(q => ({
        ...q,
        active: q.id === questionId
      })),
      activeQuestion: prevState.questions.find(q => q.id === questionId)
    }));
  }

  onAnswerClick(clickedAnswer, clickedIndex) {
    const isQuestionAnswered = !!this.state.answeredQuestions.find(q => q.id === this.state.activeQuestion.id);

    if (isQuestionAnswered) {
      this.setState(prevState => ({
        questions: prevState.questions.map(q => (
          q.id === this.state.activeQuestion.id
            ? {
              ...q,
              answeredIndex: clickedIndex
            } : q
        )),
        answeredQuestions: prevState.answeredQuestions.map(q => (
          q.id === this.state.activeQuestion.id
            ? {
              ...q,
              correct: clickedIndex === prevState.activeQuestion.correctAnswer
            } : q
        ))
      }));
    } else {
      this.setState(prevState => ({
        questions: prevState.questions.map(q => (
          q.id === this.state.activeQuestion.id
            ? {
              ...q,
              answeredIndex: clickedIndex
            } : q
        )),
        answeredQuestions: [
          ...prevState.answeredQuestions,
          {
            ...prevState.activeQuestion,
            correct: clickedIndex === prevState.activeQuestion.correctAnswer
          }
        ]
      }));
    }

    this.setActiveQuestion(this.state.activeQuestionIndex);
  }

  onTestEvaluation() {
    let showResults = false;

    if (this.state.questions.length !== this.state.answeredQuestions.length) {
      if (confirm("Neodpověděli jste na všechny otázky, chcete přesto vyhodnotit test?")) {
        showResults = true
      } else {
        showResults = false;
      }
    } else {
      showResults = true;

    }

    this.setState({ showResults });
  }

  onSaveTest() {
    const testToSave = {
      id: 123,
      questions: this.state.answeredQuestions
    };

    this.props.saveTest(this.props.user.uid, testToSave);
  }

  render() {
    const { questions, answeredQuestions, showResults, activeQuestion } = this.state;

    return (
      <TestPage
        questions={questions}
        answeredQuestions={answeredQuestions}
        showResults={showResults}
        activeQuestion={activeQuestion}
        setActiveQuestion={this.setActiveQuestion}
        onSaveTest={this.onSaveTest}
        onTestEvaluation={this.onTestEvaluation}
        onAnswerClick={this.onAnswerClick}
      />
    );
  }
}

TestPageContainer.defaultProps = {
  fetching: false,
  questions: []
};

TestPageContainer.propTypes = {
  fetching: PropTypes.bool,
  questions: PropTypes.arrayOf(
    PropTypes.shape({})
  )
};

const mapStateToProps = (state, props) => {
  const { kategorie } = queryString.parse(props.location.search);

  return {
    fetching: state.questions.fetching,
    questions: state.questions.items
      .filter(category => category.id = kategorie)[0].questions
      .map((q, index) => {
        if (index === 0) {
          return { ...q, active: true };
        }

        return q;
      })
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestions,
    removeQuestionsFromCategory,
    saveTest
  }, dispatch);
}

const withConnect =  connect(mapStateToProps, mapDispatchToProps)(TestPageContainer);

const enhancedQuestionDetailPageContainer = compose(
  withUser
)(withConnect);

export default enhancedQuestionDetailPageContainer;
