import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types';

import css  from './LoginAdvantages.scss';

import Icon from '../Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoginAdvantages extends PureComponent {
  render() {
    return (
      <div className="login-advantages">
        <Icon
          classNames="user login-advantages__user-icon"
          icon="user"
        />

        <strong className="login-advantages__label">
          Přihlašte se a používejte funkce jako:
        </strong>

        <ul className="login-advantages__list">
          <li className="login-advantages__item">
            <FontAwesomeIcon
              className="login-advantages__favourite-icon"
              icon="star"
            />
            <span>Uložení otázky do oblíbených</span>
          </li>
          <li className="login-advantages__item">
            <FontAwesomeIcon
              className="login-advantages__note-icon"
              icon="sticky-note"
            />
            <span>Přidání poznámky k otázce</span>
          </li>
        </ul>
      </div>
    );
  }
}

LoginAdvantages.propTypes = {
  note: PropTypes.string,
  loading: PropTypes.bool,
  favourite: PropTypes.bool,
  onFavouriteClick: PropTypes.func
};

LoginAdvantages.defaultProps = {
  note: '',
  loading: false,
  favourite: false,
  onFavouriteClick: () => {}
};

export default LoginAdvantages;
