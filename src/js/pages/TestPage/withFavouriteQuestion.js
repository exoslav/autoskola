import React from 'react';

export default (BaseComponent) => {
  class withFavouriteQuestion extends React.Component {
    constructor() {
      super();

      this.favourite = false;
    }

    render() {
      const { favouriteQuestion, currentQuestion } = this.props;

      if (favouriteQuestion && currentQuestion) {
        this.favourite = favouriteQuestion.id === currentQuestion.id;
      } else {
        this.favourite = false;
      }

      return (
        <BaseComponent
          {...this.props}
          favourite={this.favourite}
        />
      );
    }
  }

  return withFavouriteQuestion;
}
