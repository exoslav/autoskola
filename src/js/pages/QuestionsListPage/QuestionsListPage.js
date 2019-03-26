import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { lifecycle } from 'recompose';

import './QuestionsListPageStyles.scss';

import compose from '../../utils/compose';
import Loader from '../../components/Loader/Loader';
import Icon from '../../components/Icon/Icon';
import Logo from '../../components/Logo/Logo';
import LabelTag from '../../components/LabelTag/LabelTag';
import Container from '../../components/Container/Container';
import QuestionList from '../../components/QuestionList/QuestionList';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader';
import Input from '../../components/FormElements/Input/Input';
import Label from '../../components/FormElements/Label/Label';
import FieldWrap from '../../components/FormElements/FieldWrap/FieldWrap';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import withUser from '../../components/hoc/withUser';
import withDisplayView from '../../components/hoc/withDisplayView';
import withComposedQuestions from '../../components/hoc/withComposedQuestions';
import withSavedQuestionsResourcer from '../../components/hoc/withSavedQuestionsResourcer';
import withMultipleQuestionsResourcer from '../../components/hoc/withMultipleQuestionsResourcer';

const getBreadcrumbsRoute = (slug) => [
  {
    label: 'Kategorie otazek',
    link: slug
  }
];

const QuestionsListPage = ({
  name,
  perex,
  totalQuestions,
  fetching,
  category,
  displayView,
  onDisplayViewChange,
  getQuestionsForced,
  questions,
  error
}) => (
  <div className="list-page__wrapper">
    <div className="list-page__header">
      <Container classNames="list-page__header-wrapper">
        <div className="list-page__header-content">
          <h1 className="list-page__title">{category.name}</h1>
          <p className="list-page__perex">{category.perex}</p>
          <LabelTag label={<span>Celkem <strong>{category.totalQuestions}</strong> otázek</span>} />
          <LabelTag classNames="labeltag__last-updated" label={<span>Naposledy aktualizováno <strong>29.1.2019</strong></span>} />
        </div>

        <div className="list-page__run-test">
          <strong className="list-page__run-test__title">Začněte nový test s rychlou volbou z následujících nastavení:</strong>

          <form action="" className="list-page__form">
            <div className="list-page__form__questions">
              <strong>Počet otázek:</strong>

              <div className="list-page__form__questions__inputs">
                <FieldWrap>
                  <Input checked type="radio" name="test-questions" id="test-30" value="30" />
                  <Label labelText="30" for="test-30" />
                </FieldWrap>

                <FieldWrap>
                  <Input checked type="radio" name="test-questions" id="test-60" value="60" />
                  <Label labelText="60" for="test-60" />
                </FieldWrap>

                <FieldWrap>
                  <Input checked type="radio" name="test-questions" id="test-90" value="90" />
                  <Label labelText="90" for="test-90" />
                </FieldWrap>
              </div>
            </div>
          </form>

          <Link
            className="list-page__run-test__link button button--red"
            to={`/test?category=${category.id}&count=30&sorting=random`}
          >
            Spustit test
          </Link>
        </div>
      </Container>
    </div>

    <Container>
      <div className="list-page__infoblocks">
        <InfoBlock
          title="Co vás čeká?"
          infoItems={[
            {
              text: '20 otázek s obrázky'
            },
            {
              text: 'Zhruba 100 minut "zábavy", pokud se rozhodnete odpovědet na všechny otázky'
            }
          ]}
        />

        <InfoBlock
          view="wrapped"
          title="Užitečné odkazy"
          infoItems={[
            {
              text: '<a href="https://www.zakonyprolidi.cz/cs/2000-361" target="_blank">Zákon č. 361/2000 Sb. ve znění pozdějších předpisů</a>'
            },
            {
              text: '<a href="https://www.ibesip.cz/Tematicke-stranky/Pravidla-silnicniho-provozu" target="_blank">BESIP</a>'
            }
          ]}
        />
      </div>

      <QuestionListHeader
        displayView={displayView}
        onDisplayViewChange={onDisplayViewChange}
        categoryId={category.id}
        onPaginationItemClick={getQuestionsForced}
      />

      <div className="list-page__questions-block">
        {
          fetching &&
          <div className="list-page__loader">
            <Logo />
            <Loader />
            <p className="list-page__loader__label">Načítá se seznam otázek</p>
          </div>
        }

        {
          !fetching && questions.length === 0 && !error &&
            <div className="list-page__no-questions-found">
              <Icon icon={['far', 'sad-tear']} />
              <p>Ouha, to je neštěstí. Něco se pokazilo a nenašli jsme tu žádné otázky.</p>
            </div>
        }

        {
          questions.length > 0 && !error &&
          <QuestionList
            items={questions}
            displayView={displayView}
          />
        }
      </div>
    </Container>
  </div>
);

QuestionsListPage.defaultProps = {
  fetching: false,
  displayView: 'lines',
  error: false,
  onDisplayViewChange: () => {}
};

QuestionsListPage.propTypes = {
  fetching: PropTypes.bool,
  displayView: PropTypes.string,
  error: PropTypes.bool,
  onDisplayViewChange: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  fetching: state.questions.fetching,
  lastVisible: state.questions.lastVisible
});

export default compose(
  connect(mapStateToProps),
  withUser,
  withSavedQuestionsResourcer,
  withMultipleQuestionsResourcer,
  withComposedQuestions,
  withDisplayView,
  lifecycle({
    componentDidMount() {
      this.props.setBreadcrumbsRoutes(getBreadcrumbsRoute(this.props.categoryId));
    }
  })
)(QuestionsListPage);

