import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

class Input extends React.PureComponent {
  render() {
    return (
      <input
        id={this.props.id}
        className="input-component"
        type={this.props.type}
        checked={this.props.checked}
        name={this.props.name}
        value={this.props.value}
      />
    );
  }
}

Input.defaultProps = {
  id: '',
  type: 'text',
  checked: false,
  value: ''
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf([
    'text', 'email', 'radio'
  ]),
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default Input;
