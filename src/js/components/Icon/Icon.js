import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './Icon.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends React.PureComponent {
  render() {
    return (
      <FontAwesomeIcon
        onClick={this.props.onIconClick}
        className={`icon-component icon-component--${this.props.classNames}`}
        icon={this.props.icon}
      />
    );
  }
}

Icon.defaultProps = {
  classNames: '',
  onIconClick: () => {}
};

Icon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  classNames: PropTypes.string,
  onIconClick: PropTypes.func
};

export default Icon;
