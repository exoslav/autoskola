import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import 'firebase/firestore';

import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';


class QuestionsPage extends React.Component {
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
          <li>Spusit náhodný test</li>
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
                <li key={q.id}>{`${q.id} - ${q.name}`}</li>
              ))
            }
          </ol>
        }
      </div>
    );
  }
}

QuestionsPage.defaultProps = {
  fetching: false
};

QuestionsPage.propTypes = {
  fetching: PropTypes.bool
};

function fetchCategory(fields = [], currentId) {
  return fields.find(category => category.id === currentId);
}

const mapStateToProps = (state, props) => {
  const currentCategory = fetchCategory(state.questions.items, props.match.params.id);

  return {
    fetching: state.questions.fetching,
    questionCategory: currentCategory
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getQuestions, removeQuestionsFromCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage)
