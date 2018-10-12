import React from 'react';
import PropTypes from 'prop-types';
import withTranslationsContext from '../../withTranslationsContext';

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

Header.defaultProps = {
  user: null
};

Header.propTypes = {
  user: PropTypes.shape({})
};

export default withTranslationsContext(Header);
