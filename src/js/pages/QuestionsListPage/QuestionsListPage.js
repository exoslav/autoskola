import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import css from './QuestionsListPageStyles.scss';

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
      <div className="list-page__wrapper">
        <h1 className="list-page__header">{name}</h1>

        <p>{perex}</p>

        <ul className="list-page__run-test">
          <li className="list-page__run-test__item">
            <Link
              className="list-page__run-test__link"
              to={`/test?kategorie=${this.props.questionCategory.id}`}
            >
              Spustit test od první otázky
            </Link>
          </li>
          <li>
            <Link
              className="list-page__run-test__link"
              to={`/test?kategorie=${this.props.questionCategory.id}`}
            >
              Spustit test a otázky setřídit náhodně
            </Link>
          </li>
          <li>
            <Link
              className="list-page__run-test__link"
              to={`/test?kategorie=${this.props.questionCategory.id}`}
            >
              Nastavit si vlastní test ze zobrazených otázek
            </Link>
          </li>
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
              questions.map(q => (
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
