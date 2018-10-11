import React from 'react';
import TranslationsContext from './TranslationsContext';

export default (BaseComponent) => {
  class WithTranslationsContext extends React.Component {
    render () {
      return (
        <TranslationsContext.Consumer>
          {translations => (
            <BaseComponent
              {...this.props}
              translations={translations}
            />
          )}
        </TranslationsContext.Consumer>
      );
    }
  }

  return WithTranslationsContext;
}

