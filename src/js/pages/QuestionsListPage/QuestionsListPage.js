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
import {
  getQuestions,
  getQuestionsWithLimit,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSavedQuestionsResourcer from '../../components/hoc/withSavedQuestionsResourcer';
import withMultipleQuestionsResourcer from '../../components/hoc/withMultipleQuestionsResourcer';

class QuestionsListPage extends React.Component {
  constructor() {
    super();

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    console.log('listing page component did mount');
  }

  componentWillUnmount() {
    console.log('listing page component is about to unmount');
  }

  handleButtonClick() {
    const { category, lastVisible, getQuestionsWithLimit } = this.props;

    if (!lastVisible) {
      alert('No more questions to load');

      return;
    }

    getQuestionsWithLimit(category.id, lastVisible);
  }

  render() {
    window.test = true;
    console.log('listing page render')
    const { name, perex } = this.props.category;

    return (
      <div className="list-page__wrapper">
        <h1 className="list-page__header-title">{name}</h1>

        <div className="list-page__header">
          <p className="list-page__header__perex">{perex}</p>

          <ul className="list-page__run-test">
            <li className="list-page__run-test__item">
              <Link
                className="list-page__run-test__link"
                to={`/test?kategorie=${this.props.category.id}`}
              >
                Spustit test od první otázky
              </Link>
            </li>
            <li>
              <Link
                className="list-page__run-test__link"
                to={`/test?kategorie=${this.props.category.id}`}
              >
                Spustit test a otázky setřídit náhodně
              </Link>
            </li>
            <li>
              <Link
                className="list-page__run-test__link"
                to={`/test?kategorie=${this.props.category.id}`}
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
          items={this.props.questions}
          displayView={this.props.displayView}
        />

        <button
          type="button"
          onClick={this.handleButtonClick}
        >
          Načíst další otázky
        </button>
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

const mapStateToProps = (state, props) => ({
  fetching: state.questions.fetching,
  lastVisible: state.questions.lastVisible
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getQuestions,
    getQuestionsWithLimit,
    removeQuestionsFromCategory
  }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(QuestionsListPage);

const enhancedQuestionsListPage = compose(
  withUser,
  withSavedQuestionsResourcer,
  withMultipleQuestionsResourcer,
  withComposedQuestions,
  withDisplayView
)(withConnect);

export default enhancedQuestionsListPage;
