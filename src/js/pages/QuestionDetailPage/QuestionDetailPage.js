import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';
import saveFavouriteQuestion from '../../firebase/user/saveFavouriteQuestion';
import deleteFavouriteQuestion from '../../firebase/user/deleteFavouriteQuestion';
import getFavouriteQuestion from '../../firebase/user/getFavouriteQuestion';

class QuestionDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
      favourite: false,
      selectedAnswer: null
    };

    this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.questionCategory.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user && this.props.currentQuestion) {
      getFavouriteQuestion(this.props.currentQuestion.id)
        .then((snapshot) => {
          if (snapshot.data()) {
            this.setState({ favourite: true })
          } else {
            this.setState({ favourite: false })
          }
        });
    }
  }

  componentWillUnmount() {
     this.props.removeQuestionsFromCategory(this.props.questionCategory.id);
  }

  answerOnClick(index) {
    this.setState({ selectedAnswer: index })
  }

  handleFavouriteClick(questionId) {
    if (this.state.favourite) {
      deleteFavouriteQuestion(questionId);
      this.setState((state) => ({ favourite: false }));
    } else {
      saveFavouriteQuestion(questionId);
      this.setState((state) => ({ favourite: true }));
    }



  }

  render() {
    if (this.props.fetching) {
      return (
        <div>loading...</div>
      );
    }

    const { id, question, answers, correctAnswer } = this.props.currentQuestion;

    return (
      <div>
        <h1>{`Otázka {${id}}: ${question}`}</h1>
        <ol>
          {
            answers.map((answer, index) => (
              <li
                key={index}
                onClick={() => this.answerOnClick(index)}
                className={(
                  this.state.selectedAnswer === index &&
                  this.state.selectedAnswer === Number(correctAnswer) ? 'correct' : ''
                )}
              >
                {answer}
              </li>
            ))
          }
        </ol>

        {
          this.props.user &&
          <FontAwesomeIcon
            onClick={() => this.handleFavouriteClick(id)}
            icon={[this.state.favourite ? 'fas' : 'far', 'star']}
          />
        }
      </div>
    );
  }
}

QuestionDetailPage.defaultProps = {
  fetching: false,
  currentQuestion: null
};

QuestionDetailPage.propTypes = {
  fetching: PropTypes.bool,
  currentQuestion: PropTypes.shape()
};

function fetchCategory(fields = [], currentId) {
  return fields.find(category => category.id === currentId);
}

const mapStateToProps = (state, props) => {
  const currentCategory = fetchCategory(state.questions.items, props.match.params.categoryId);
  const currentQuestion = currentCategory.questions.find(q => q.id === Number(props.match.params.questionId));

  return {
    user: state.auth.user,
    currentQuestion,
    questionCategory: currentCategory,
    fetching: state.questions.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getQuestions, removeQuestionsFromCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);
