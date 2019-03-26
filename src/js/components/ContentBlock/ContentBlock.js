import React from 'react';
import PropTypes from 'prop-types';

import './ContentBlock.scss';

class ContentBlock extends React.PureComponent {
  render() {
    return (
      <div className="content-block">
        {this.props.children && this.props.children}
      </div>
    );
  }
}

ContentBlock.defaultProps = {
  user: null
};

ContentBlock.propTypes = {
  user: PropTypes.shape({})
};

export default ContentBlock;
