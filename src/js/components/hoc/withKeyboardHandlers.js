import React from 'react';
import { lifecycle } from 'recompose';

export default ({
  arrowLeftCallback = () => {},
  arrowRightCallback = () => {}
}) => (BaseComponent) => {
  const withKeyboardHandlers = (props) => (
    <BaseComponent {...props} />
  );

  return lifecycle({
    componentDidMount() {
      document.addEventListener('keydown', (e) => {
        const keyName = e.key;

        if (keyName === 'ArrowLeft') {
          arrowLeftCallback(this.props);
        }

        if (keyName === 'ArrowRight') {
          arrowRightCallback(this.props);
        }
      });
    }
  })(withKeyboardHandlers);
}

