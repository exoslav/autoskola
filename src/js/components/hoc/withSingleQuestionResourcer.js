import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuestionById, removeQuestionsFromCategory } from '../../redux/reducers/questionsReducer'

export default (BaseComponent) => {
  class withSingleQuestionResourcer extends React.Component {
    componentDidMount() {
      const { categoryId, questionId } = this.props;

      if (questionId && categoryId) {
        this.props.getQuestionById(categoryId, questionId);
      }
    }

    componentWillUnmount() {
      const { categoryId } = this.props;

      if (categoryId) {
        this.props.removeQuestionsFromCategory(categoryId);
      }
    }

    componentDidUpdate(prevProps) {
      const { questionId, categoryId } = this.props;

      if (questionId !== prevProps.questionId) {
        this.props.getQuestionById(categoryId, questionId);
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          questions={this.props.questions}
          questionsLoading={this.props.questionsLoading}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    const category = state.questions.items.find(category => (
      category.id === props.categoryId
    ));

    return {
      questions: category.questions.length > 0
        ? category.questions : [],
      questionsLoading: state.questions.fetching
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      getQuestionById,
      removeQuestionsFromCategory
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withSingleQuestionResourcer);
}
