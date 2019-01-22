import React from 'react';
import PropTypes from 'prop-types';

import css from './Button.scss';

class Button extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loginFormOpen: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();

    this.props.onButtonClick();
  }

  render() {
    return (
      <button
        className="button"
        onClick={this.handleOnClick}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.defaultProps = {
  text: '',
  updating: false,
  onButtonClick: () => {}
};

Button.propTypes = {
  text: PropTypes.string,
  updating: PropTypes.bool,
  onButtonClick: PropTypes.func
};

export default withTranslationsContext(Button);
