import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './InfoBlockItem.scss';

class InfoBlockItem extends PureComponent {
  render() {
    return(
      <li className={`infoblock-item infoblock-item--${this.props.view}`}>
        <div dangerouslySetInnerHTML={{ __html: this.props.text}} />
      </li>
    );
  }
};

InfoBlockItem.defaultProps = {
  icon: null,
  view: 'aligned'
};

InfoBlockItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  view: PropTypes.oneOf(['aligned', 'wrapped'])
};

export default InfoBlockItem;
