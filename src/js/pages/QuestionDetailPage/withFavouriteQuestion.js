import React from 'react';
import { connect } from 'react-redux'

export default (BaseComponent) => {
  class withFavouriteQuestion extends React.Component {
    render() {
      return (
        <BaseComponent
          {...this.props}
          favourite={this.props.favourite}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    let currentQuestionId = null;

    if (props.currentQuestion) {
      currentQuestionId = props.currentQuestion.id;
    }

    return {
      favourite: !!state.favouriteQuestions.items.find(i => i.id === currentQuestionId)
    };
  }

  return connect(mapStateToProps)(withFavouriteQuestion);
}
