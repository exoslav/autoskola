import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { onFavouriteQuestionsChange, removeFavouriteQuestionsFromState } from '../../redux/reducers/favouriteQuestionsReducer'

export default (BaseComponent) => {
  class withFavouriteQuestionsResourcer extends React.Component {
    constructor() {
      super();

      this.unsubscribeFunction = () => {};
    }

    componentDidMount() {
      if (this.props.user) {
        this.unsubscribeFunction = this.props.onFavouriteQuestionsChange(this.props.user.uid);
      }
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.user &&
        this.props.user !== prevProps.user
      ) {
        this.unsubscribeFunction = this.props.onFavouriteQuestionsChange(this.props.user.uid);
      }
    }

    componentWillUnmount() {
      this.props.removeFavouriteQuestionsFromState();
      this.unsubscribeFunction();
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          favouriteQuestions={this.props.favouriteQuestions}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({ favouriteQuestions: state.favouriteQuestions.items })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onFavouriteQuestionsChange,
      removeFavouriteQuestionsFromState
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withFavouriteQuestionsResourcer);
}
