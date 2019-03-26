import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { compose, lifecycle, withHandlers } from 'recompose';

import {
  getQuestions,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';

export default (BaseComponent) => {
  const withSavedQuestionsResourcer = (props) => (
    <BaseComponent
      {...props}
      category={props.category}
      questions={props.questions}
      questionsLoading={props.questionsLoading}
      getQuestionsForced={props.getNewMultipleQuestions}
    />
  );

  const mapStateToProps = (state, props) => {
    const category = state.questions.items.find(category => category.id === props.categoryId);

    return {
      category,
      questions: category.questions,
      questionsLoading: state.questions.fetching
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      getQuestions,
      removeQuestionsFromCategory
    }, dispatch);
  }

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
      componentDidMount() {
        const query = queryString.parse(location.hash.split('?')[1]);
        const page = query.page ? query.page * 15 - 15 + 1 : undefined;

        this.props.getQuestions(this.props.categoryId, page);
      },
      componentWillUnmount() {
        this.props.removeQuestionsFromCategory(this.props.categoryId);
      }
    }),
    withHandlers({
      getNewMultipleQuestions: (props) => (pageIndex) => {
        const page = pageIndex * 15 - 15 + 1;

        props.getQuestions(props.categoryId, page);
      }
    })
  )(withSavedQuestionsResourcer);
}
