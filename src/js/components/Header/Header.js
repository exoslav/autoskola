import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withTranslationsContext from '../../withTranslationsContext';

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <h1>
          <Link to="/">
            Autoškola
          </Link>
        </h1>
        {
          this.props.user &&
          <div>
            {this.props.translations.signInAs}: {this.props.user.email}
          </div>
        }

        {
          this.props.user &&
          <Link to="/oblibene-otazky">
            Oblíbené otázky
          </Link>
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
