import React from 'react';
import { Link } from 'react-router-dom';

import './LogoStyles.scss';

class Logo extends React.PureComponent {
  render() {
    return (
      <Link className="logo" to="/">
        <div class="logo__wrapper">
          <img className="logo__icon" src="./assets/imgs/logo.png" />
        </div>

        <span className="logo__auto">uto</span>
        <span>škola</span>
      </Link>
    );
  }
}

export default Logo;
