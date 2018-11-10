import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import queryString  from 'query-string';

import css  from './TestPageStyles.scss';

import compose from '../../utils/compose';
import withCurrentQuestion from './withCurrentQuestion';
import withUser from '../../components/hoc/withUser';
import AnswerListItem from '../../components/AnswerListItem/AnswerListItem';
import {
  getQuestions,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import { saveTest } from '../../redux/reducers/testReducer';

class TestPage extends React.Component {
  constructor() {
    super();

    this.state = {
      showResult: false,
      activeQuestion: null,
      answeredQuestions: []
    }

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
  }

  componentDidMount() {
    const { kategorie } = queryString.parse(this.props.location.search);

    this.props.getQuestions(kategorie);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questions !== prevProps.questions) {
      this.setActiveQuestion(this.props.questions[0]);
    }
  }

  componentWillUnmount() {
    const { kategorie } = queryString.parse(this.props.location.search);

    this.props.removeQuestionsFromCategory(kategorie);
  }

  setActiveQuestion(activeQuestion) {
    this.setState({ activeQuestion });
  }

  handleAnswerClick(clickedAnswer, clickedIndex) {
    const isQuestionAnswered = !!this.state.answeredQuestions.find(q => q.id === this.state.activeQuestion.id);

    if (isQuestionAnswered) {
      this.setState(prevState => ({
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
        answeredQuestions: [
          ...prevState.answeredQuestions,
          {
            ...prevState.activeQuestion,
            correct: clickedIndex === prevState.activeQuestion.correctAnswer
          }
        ]
      }));
    }
  }

  calculateResult() {
    if (this.props.questions.length !== this.state.answeredQuestions.length) {
      if (confirm("Neodpověděli jste na všechny otázky, chcete přesto vyhodnotit test?")) {
        this.setState({ showResult: true });
      } else {
        this.setState({ showResult: false });
      }
    } else {
      this.setState({ showResult: true });
    }
  }

  handleOnSaveTest() {
    const testToSave = {
      id: 123,
      questions: this.state.answeredQuestions
    };

    this.props.saveTest(this.props.user.uid, testToSave);
  }

  render() {
    const { questions } = this.props;
    const { activeQuestion } = this.state;

    return (
      <div className="test__wrapper">
        <div className="test__active-question">
          {
            activeQuestion &&
            <div>
              <h1 className="test__active-question__title">{activeQuestion.question}</h1>
              <ol className="test__active-question__answer-list">
                {activeQuestion.answers.map((answer, index) => (
                  <AnswerListItem
                    key={index}
                    index={index}
                    answer={answer}
                    onItemClick={this.handleAnswerClick}
                  />
                ))}
              </ol>
            </div>
          }
        </div>

        <div className="test__thumb-list__wrapper">
          <strong className="test__thumb-list__label">Seznam otázek v testu:</strong>

          {
            questions.length > 0 &&
            this.state.activeQuestion &&
            <ol className="test__thumb-list">
              {
                questions.map((q, index) => (
                  <li
                    className={`
                  ${this.state.activeQuestion.id === q.id
                      ? 'test__thumb-list__item--active' : ''
                      } test__thumb-list__item`}
                    onClick={() => this.setActiveQuestion(q)}
                  >
                    <span className="test__thumb-list__item__index">{index}</span>
                    <span className="test__thumb-list__item__name">{q.question}</span>
                  </li>
                ))
              }
            </ol>
          }
        </div>

        <div className="test__footer">
          <button
            onClick={() => this.calculateResult()}
            type="button"
          >
            Vyhodnotit test
          </button>

          {
            this.state.showResult &&
            this.props.questions.length !== this.state.answeredQuestions.length &&
            <strong>
              {`Odpověděli jste na ${this.state.answeredQuestions.length} otázek z ${this.props.questions.length}.`}
            </strong>
          }

          {
            this.state.showResult &&
            <ul>
              {
                this.state.answeredQuestions.map(q => (
                  <li>
                    <strong>{q.question}</strong>
                    <span>{q.correct ? 'Spravne': 'Spatne'}</span>
                  </li>
                ))
              }
            </ul>
          }

          {
            this.state.showResult &&
            <button
              type="button"
              onClick={() => this.handleOnSaveTest()}
            >
              Ulozit tento test
            </button>
          }
        </div>
      </div>
    );
  }
}

TestPage.defaultProps = {
  fetching: false,
  questions: []
};

TestPage.propTypes = {
  fetching: PropTypes.bool,
  questions: PropTypes.arrayOf(
    PropTypes.shape({})
  )
};

const mapStateToProps = (state, props) => {
  const { kategorie } = queryString.parse(props.location.search);

  return {
    fetching: state.questions.fetching,
    questions: state.questions.items.filter(category => category.id = kategorie)[0].questions
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestions,
    removeQuestionsFromCategory,
    saveTest
  }, dispatch);
}

const withConnect =  connect(mapStateToProps, mapDispatchToProps)(TestPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withCurrentQuestion
)(withConnect);

export default enhancedQuestionDetailPage;
