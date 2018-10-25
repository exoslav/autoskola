import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import QuestionListItem from '../../components/QuestionListItem/QuestionListItem';
import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';

class QuestionsListPage extends React.Component {
  componentWillUnmount() {
     this.props.removeQuestionsFromCategory(this.props.questionCategory.id);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.questionCategory.id);
  }

  render() {
    const { name, perex, questions } = this.props.questionCategory;

    return (
      <div>
        <h1>{name}</h1>

        <p>{perex}</p>

        <ul>
          <li>Spusit test a otázky setřídit náhodně</li>
          <li>Spustit test od první otázky</li>
          <li>Nastavit si vlastní test ze zobrazených otázek</li>
        </ul>

        {
          this.props.fetching &&
          <div>Loading questions...</div>
        }

        {
          questions &&
          questions.length > 0 &&
          <ol>
            {
              questions.map((q, index) => (
                <QuestionListItem
                  key={q.id}
                  id={q.id}
                  question={q.question}
                  link={`${this.props.match.params.categoryId}/${q.id}`}
                />
              ))
            }
          </ol>
        }
      </div>
    );
  }
}

QuestionsListPage.defaultProps = {
  fetching: false
};

QuestionsListPage.propTypes = {
  fetching: PropTypes.bool
};

function fetchCategory(fields = [], currentId) {
  return fields.find(category => category.id === currentId);
}

const mapStateToProps = (state, props) => {
  const currentCategory = fetchCategory(state.questions.items, props.match.params.categoryId);

  return {
    fetching: state.questions.fetching,
    questionCategory: currentCategory
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getQuestions, removeQuestionsFromCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsListPage)
