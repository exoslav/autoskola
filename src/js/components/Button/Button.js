import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';

import Icon from '../Icon/Icon';

import './Button.scss';

const iconButton = icon => (
  <div className="button-component__icon">
    <Icon icon={icon} />
  </div>
);

const Button = ({ type, classNames, icon, text, handleOnClick, iconPosition }) => (
  <button
    type={type}
    className={`
      button
      ${classNames.join(' ')}
      ${icon ? 'button-component__iconed' : ''}
      ${iconPosition === 'left' ? 'button-component__iconed--left' : ''}
      ${iconPosition === 'right' ? 'button-component__iconed--right' : ''}
    `}
    onClick={handleOnClick}
  >
    {
      icon && iconPosition === 'left' &&
      iconButton(icon)
    }

    {text}

    {
      icon && iconPosition === 'right' &&
      iconButton(icon)
    }
  </button>
);

Button.defaultProps = {
  type: 'button',
  text: '',
  updating: false,
  classNames: [],
  onButtonClick: () => {},
  icon: null,
  iconPosition: null
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  updating: PropTypes.bool,
  classNames: PropTypes.arrayOf(PropTypes.string),
  onButtonClick: PropTypes.func,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right'])
};

export default compose(
  pure,
  withHandlers({
    handleOnClick: (props) => (e) => {
      e.preventDefault();
      props.onButtonClick();
    }
  })
)(Button);
