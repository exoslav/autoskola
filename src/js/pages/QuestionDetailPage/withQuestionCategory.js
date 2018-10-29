import React from 'react';
import { connect } from 'react-redux'

export default (BaseComponent) => {
  class withQuestionCategory extends React.Component {
    render() {
      return (
        <BaseComponent
          {...this.props}
          questionCategoryId={this.props.questionCategoryId}
          questionCategoryItems={this.props.questionCategoryItems}
        />
      );
    }
  }

  function fetchCategory(categories = [], currentId) {
    return categories.find(category => category.id === currentId) || {};
  }

  const mapStateToProps = (state, props) => {
    const currentCategory = fetchCategory(state.questions.items, props.match.params.categoryId);

    return {
      questionCategoryId: currentCategory.id || null,
      questionCategoryItems: currentCategory.questions || []
    };
  }

  return connect(mapStateToProps, null)(withQuestionCategory);
}
