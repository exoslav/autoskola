import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getQuestions,
  getQuestionsWithLimit,
  removeQuestionsFromCategory
} from '../../redux/reducers/questionsReducer';

export default (BaseComponent) => {
  class withSavedQuestionsResourcer extends React.Component {
    componentDidMount() {
      this.props.getQuestions(this.props.categoryId);
    }

    componentWillUnmount() {
      this.props.removeQuestionsFromCategory(this.props.categoryId);
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          category={this.props.category}
          questions={this.props.questions}
          questionsLoading={this.props.questionsLoading}
        />
      );
    }
  }

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
      getQuestionsWithLimit,
      removeQuestionsFromCategory
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withSavedQuestionsResourcer);
}
