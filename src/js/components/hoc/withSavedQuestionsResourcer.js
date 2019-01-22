import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  onSavedQuestionsChange,
  removeSavedQuestionsFromState
} from '../../redux/reducers/savedQuestionsReducer';

export default (BaseComponent) => {
  class withSavedQuestionsResourcer extends React.Component {
    constructor() {
      super();

      this.unsubscribeFunction = () => {};
    }

    componentDidMount() {
      if (this.props.user) {
        this.unsubscribeFunction = this.props.onSavedQuestionsChange(this.props.user.uid);
      }
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.user &&
        this.props.user !== prevProps.user
      ) {
        this.unsubscribeFunction = this.props.onSavedQuestionsChange(this.props.user.uid);
      }
    }

    componentWillUnmount() {
      this.props.removeSavedQuestionsFromState();
      this.unsubscribeFunction();
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          savedQuestions={this.props.savedQuestions}
          savedQuestionsLoading={this.props.savedQuestionsLoading}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    savedQuestions: state.savedQuestions.items,
    savedQuestionsLoading: state.savedQuestions.fetching
  })

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      onSavedQuestionsChange,
      removeSavedQuestionsFromState
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(withSavedQuestionsResourcer);
}
