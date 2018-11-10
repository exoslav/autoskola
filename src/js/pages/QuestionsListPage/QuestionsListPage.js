import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import css from './QuestionsListPageStyles.scss';

import compose from '../../utils/compose';
import Loader from '../../components/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem';
import { getQuestions, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer';
import withUser from '../../components/hoc/withUser';
import withFavouriteQuestionsResourcer from '../../components/hoc/withFavouriteQuestionsResourcer';

class QuestionsListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'lines'
    };

    this.handleLinesViewClick = this.handleLinesViewClick.bind(this);
    this.handleGridViewClick = this.handleGridViewClick.bind(this);
  }

  componentWillUnmount() {
     this.props.removeQuestionsFromCategory(this.props.questionCategory.id);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.questionCategory.id);
  }

  handleLinesViewClick() {
    this.setState({ view: 'lines' });
  }

  handleGridViewClick() {
    this.setState({ view: 'grid' });
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

        <div className="list-page__list-header">
          <strong className="list-page__list-header__question-id">#</strong>
          <strong className="list-page__list-header__question-title">Název otázky</strong>

          <button
            type="button"
            className="list-page__list-header__lines-view"
            onClick={this.handleLinesViewClick}
          >
            <FontAwesomeIcon
              className={`
                list-page__list-header__lines-view__icon
                ${this.state.view === 'lines' ? ' list-page__list-header__lines-view__icon--active' : ''}
              `}
              icon="align-justify"
            />
          </button>

          <button
            type="button"
            className="list-page__list-header__grid-view"
            onClick={this.handleGridViewClick}
          >
            <FontAwesomeIcon
              className={`
                list-page__list-header__grid-view__icon
                ${this.state.view === 'grid' ? ' list-page__list-header__grid-view__icon--active' : ''}
              `}
              icon="th"
            />
          </button>
        </div>

        {
          this.props.fetching &&
          <div className="list-page__loader">
            <Loader/>
            <p className="list-page__loader__label">Načítá se seznam otázek</p>
          </div>
        }

        {
          questions &&
          questions.length > 0 &&
          <ol className={`list-page__questions-list--${this.state.view}-view`}>
            {
              questions.map(q => (
                <QuestionListItem
                  key={q.id}
                  id={q.id}
                  question={q.question}
                  favourite={q.favourite}
                  note={q.note}
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
  withFavouriteQuestionsResourcer
)(withConnect);

export default enhancedQuestionsListPage;
