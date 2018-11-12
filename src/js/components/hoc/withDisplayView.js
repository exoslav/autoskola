import React from 'react';

export default (BaseComponent) => {
  class withDisplayView extends React.Component {
    constructor() {
      super();

      this.state = {
        displayView: 'lines'
      };

      this.onDisplayViewChange = this.onDisplayViewChange.bind(this);
    }

    onDisplayViewChange(displayView) {
      this.setState({ displayView });
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          displayView={this.state.displayView}
          onDisplayViewChange={this.onDisplayViewChange}
        />
      );
    }
  }

  return withDisplayView;
}
