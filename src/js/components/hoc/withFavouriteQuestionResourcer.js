import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AnswerListItem from '../../components/AnswerListItem/AnswerListItem';
import { onFavouriteQuestionChange } from '../../redux/reducers/favouriteQuestionsReducer'

export default (BaseComponent) => {
  class withFavouriteQuestionsResourcer extends React.Component {
    constructor() {
      super();

      this.unsubscribeFunction = null;
    }

    componentDidMount() {
      const { user, onFavouriteQuestionChange } = this.props;

      if (user) {
        this.unsubscribeFunction = onFavouriteQuestionChange(
          user.uid,
          this.props.match.params.questionId
        );
      }
    }

    componentDidUpdate() {
      const { user, onFavouriteQuestionChange } = this.props;

      if (
        user &&
        typeof this.unsubscribeFunction !== 'function'
      ) {
        this.unsubscribeFunction = onFavouriteQuestionChange(
          user.uid,
          this.props.match.params.questionId
        );
      }
    }

    componentWillUnmount() {
      if (typeof this.unsubscribeFunction === 'function') {
        this.unsubscribeFunction();
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          favouriteQuestion={this.props.favouriteQuestion}
          favouriteQuestionLoading={this.props.favouriteQuestionLoading}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    favouriteQuestion: state.favouriteQuestions.currentFavouriteQuestion,
    favouriteQuestionLoading: state.favouriteQuestions.fetching
  })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ onFavouriteQuestionChange }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withFavouriteQuestionsResourcer);
}
