import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './LogoStyles.scss';

class Logo extends React.PureComponent {
  render() {
    return (
      <Link className="logo" to="/">
        Autoškola
      </Link>
    );
  }
}

export default Logo;
