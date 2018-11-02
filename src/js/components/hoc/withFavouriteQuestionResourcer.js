import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { onFavouriteQuestionChange } from '../../redux/reducers/favouriteQuestionsReducer'

export default (BaseComponent) => {
  class withFavouriteQuestionsResourcer extends React.Component {
    constructor() {
      super();

      this.unsubscribeFunction = () => {};
    }

    componentDidMount() {
      const { user, currentQuestion } = this.props;

      if (user && currentQuestion) {
        this.unsubscribeFunction = this.props.onFavouriteQuestionChange(user.uid, currentQuestion.id);
      }
    }

    componentDidUpdate() {
      const { user, currentQuestion, favouriteQuestion } = this.props;

      if (
        user &&
        currentQuestion &&
        !favouriteQuestion
      ) {
        this.unsubscribeFunction = this.props.onFavouriteQuestionChange(user.uid, currentQuestion.id);
      }
    }

    componentWillUnmount() {
      this.unsubscribeFunction();
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          favouriteQuestion={this.props.favouriteQuestion}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({ favouriteQuestion: state.favouriteQuestions.currentFavouriteQuestion })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ onFavouriteQuestionChange }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withFavouriteQuestionsResourcer);
}
