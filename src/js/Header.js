import React from 'react';
import withTranslationsContext from './withTranslationsContext';

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <h1>Autoškola</h1>
        {
          this.props.user &&
          <div>
            {this.props.translations.signInAs}: {this.props.user.email}
          </div>
        }
      </header>
    );
  }
}

export default withTranslationsContext(Header);
