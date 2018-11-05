import React from 'react';
import PropTypes from 'prop-types';

import css from './ContainerStyles.scss';

class Container extends React.Component {
  render() {
    return (
      <div className={`container ${this.props.classNames}`}>
        {this.props.children}
      </div>
    );
  }
}

Container.defaultProps = {
  classNames: '',
  children: null
};

Container.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

export default Container;
