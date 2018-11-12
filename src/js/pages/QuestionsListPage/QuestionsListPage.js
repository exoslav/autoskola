import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import css from './QuestionsListPageStyles.scss';

import compose from '../../utils/compose';
import Loader from '../../components/Loader/Loader';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader';
import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import withFavouriteQuestionsResourcer from '../../components/hoc/withFavouriteQuestionsResourcer';

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
        <h1 className="list-page__header-title">{name}</h1>

        <div className="list-page__header">
          <p className="list-page__header__perex">{perex}</p>

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
        </div>

        <QuestionListHeader
          displayView={this.props.displayView}
          onDisplayViewChange={this.props.onDisplayViewChange}
        />

        {
          this.props.fetching &&
          <div className="list-page__loader">
            <Loader/>
            <p className="list-page__loader__label">Načítá se seznam otázek</p>
          </div>
        }

        <QuestionList
          items={questions}
          displayView={this.props.displayView}
        />
      </div>
    );
  }
}

QuestionsListPage.defaultProps = {
  fetching: false,
  displayView: 'lines',
  onDisplayViewChange: () => {}
};

QuestionsListPage.propTypes = {
  fetching: PropTypes.bool,
  displayView: PropTypes.string,
  onDisplayViewChange: PropTypes.func
};

function fetchCategory(fields = [], currentId) {
  return fields.find(category => category.id === currentId);
}

function fetchFavourites(questions = [], favourites = []) {
  return questions.map((q) => ({
    ...q,
    note: !!favourites.find(fq => (fq.id === q.id) && fq.note),
    favourite: !!favourites.find(fq => (fq.id === q.id) && fq.favourite)
  }))
}

const mapStateToProps = (state, props) => {
  const currentCategory = fetchCategory(state.questions.items, props.match.params.categoryId);

  return {
    fetching: state.questions.fetching,
    questionCategory: {
      ...currentCategory,
      questions: fetchFavourites(currentCategory.questions, state.favouriteQuestions.items)
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getQuestions, removeQuestionsFromCategory }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(QuestionsListPage);

const enhancedQuestionsListPage = compose(
  withUser,
  withFavouriteQuestionsResourcer,
  withDisplayView
)(withConnect);

export default enhancedQuestionsListPage;
