import React from 'react';
import PropTypes from 'prop-types';

import './LabelTag.scss';

class LabelTag extends React.PureComponent {
  render() {
    return (
      <span className={`labeltag ${this.props.classNames}`}>
        {this.props.label}
      </span>
    );
  }
}

LabelTag.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  classNames: PropTypes.string
};

export default LabelTag;
