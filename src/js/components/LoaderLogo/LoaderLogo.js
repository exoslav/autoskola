import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo'
import Loader from '../Loader/Loader'

import './LoaderLogo.scss';

class LoaderLogo extends PureComponent {
  render() {
    return (
      <div className={`loader-logo ${this.props.classNames}`}>
        <Logo />
        <Loader />
      </div>
    );
  }
}

LoaderLogo.defaultProps = {
  classNames: '',
  text: null
};

LoaderLogo.propTypes = {
  classNames: PropTypes.string,
  text: PropTypes.string
};

export default LoaderLogo;
