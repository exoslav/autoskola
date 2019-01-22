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
      showResults: false
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
    if (this.props.questions.length !== prevProps.questions.length) {
      const { questions } = this.props;

      this.setState({ questions });
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
      }))
    }));
  }

  onAnswerClick(questionId, answerIndex) {
    const activeQuestion = this.state.questions.find(q => q.id === questionId);

    this.setState(prevState => ({
      questions: prevState.questions.map(q => (
        q.id === questionId
          ? {
            ...q,
            answered: true,
            answeredIndex: answerIndex,
            correct: answerIndex === activeQuestion.correctAnswer
          } : q
      ))
    }));
  }

  onTestEvaluation() {
    let showResults = false;

    const { questions } = this.state;
    const answeredQuestions = questions.filter(q => q.answered);

    if (questions.length !== answeredQuestions.length) {
      if (confirm(`Odpověděli jste na ${answeredQuestions.length} otázek z ${questions.length}, chcete přesto vyhodnotit test?`)) {
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
      questions: this.state.questions
    };

    this.props.saveTest(this.props.user.uid, testToSave);
  }

  render() {
    const { questions, showResults } = this.state;

    return (
      <TestPage
        questions={questions}
        answeredQuestions={this.state.questions.filter(q => q.answered)}
        showResults={showResults}
        activeQuestion={this.state.questions.find(q => q.active)}
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
