import React from 'react';

import './FieldWrap.scss';

class FieldWrap extends React.PureComponent {
  render() {
    return (
      <div className="field-wrap">
        {this.props.children}
      </div>
    );
  }
}

export default FieldWrap;
