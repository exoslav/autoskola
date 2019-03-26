import React from 'react';
import PropTypes from 'prop-types';

import './Label.scss';

class Label extends React.PureComponent {
  render() {
    return (
      <label htmlFor={this.props.for}>
        {this.props.labelText}
      </label>
    );
  }
}

Label.propTypes = {
  for: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired
};

export default Label;
