import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import queryString  from 'query-string';

import compose from '../../utils/compose';
import withFavouriteQuestion from './withFavouriteQuestion';
import withCurrentQuestion from './withCurrentQuestion';
import withUser from '../../components/hoc/withUser';
import withFavouriteQuestionResourcer from '../../components/hoc/withFavouriteQuestionResourcer';
import {
  getQuestions,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import {
  addFavouriteQuestion,
  removeFavouriteQuestion,
  removeFavouriteQuestionFromState
} from '../../redux/reducers/favouriteQuestionsReducer';

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
    this.setState({ showResult: true });
  }

  render() {
    const { questions } = this.props;
    const { activeQuestion } = this.state;

    return (
      <Fragment>
        {
          questions.length > 0 &&
          <ol className="test__thumb-list">
            {
              questions.map(q => (
                <li onClick={() => this.setActiveQuestion(q)}>
                  {q.question}
                </li>
              ))
            }
          </ol>
        }

        <div className="test__active-question">
          {
            activeQuestion &&
            <div>
              <h2>{activeQuestion.question}</h2>
              <ol>
                {activeQuestion.answers.map((answer, index) => (
                  <li onClick={() => this.handleAnswerClick(answer, index)}>
                    {answer}
                  </li>
                ))}
              </ol>
            </div>
          }
        </div>

        <button
          onClick={() => this.calculateResult()}
          type="button"
        >
          Vyhodnotit test
        </button>

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
      </Fragment>
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
    addFavouriteQuestion,
    removeFavouriteQuestion,
    removeFavouriteQuestionFromState
  }, dispatch);
}

const withConnect =  connect(mapStateToProps, mapDispatchToProps)(TestPage);

const enhancedQuestionDetailPage = compose(
  withUser,
  withCurrentQuestion,
  withFavouriteQuestionResourcer,
  withFavouriteQuestion
)(withConnect);

export default enhancedQuestionDetailPage;
