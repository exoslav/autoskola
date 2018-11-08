import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import css  from './Loader.scss';

class Loader extends PureComponent {
  render() {
    return (
      <div className={`loader ${this.props.classNames}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

Loader.defaultProps = {
  classNames: ''
};

Loader.propTypes = {
  classNames: PropTypes.string
};

export default Loader;
