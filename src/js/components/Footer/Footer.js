import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Footer.scss';

import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withTranslationsContext from '../../withTranslationsContext';

const Footer = ({ user }) => (
  <header className="footer">
      {
        !user &&
        <div className="footer__top-stripe">
          <Container>
            <div className="footer__top-stripe__content">
              <FontAwesomeIcon
                icon="user"
                className="footer__user-icon"
              />

              <div className="footer__should-create-account">
                <strong>Vytvořte si účet!</strong>
                <p>Pouze přihlášení uživatelé mohou našimi testy projet plnou rychlostí.</p>
              </div>
            </div>
          </Container>
        </div>
      }
    <div className="footer__technologies">
      <Container classNames="footer__container">
        <span className="footer__powered-by">Powered by:</span>
        <ul className="footer__technologies__list">
          <li className="footer__technologies__item"><img src="./assets/imgs/technologies/react.png" alt="react"/></li>
          <li className="footer__technologies__item"><img src="./assets/imgs/technologies/redux.png" alt="redux"/></li>
          <li className="footer__technologies__item"><img src="./assets/imgs/technologies/firebase.png" alt="firebase"/></li>
        </ul>
      </Container>
    </div>

    <Container>
      <div className="footer__bottom">
        <div className="footer__logo-block">
          <Logo />
          <p className="footer__copyright">Copyright © 2019 Autoskola</p>
        </div>

        <div className="footer__terms-block">
          <ul className="footer__terms-block__list">
            <li className="footer__terms-block__list__item">Podminky pouziti</li>
            <li className="footer__terms-block__list__item">Ochrana osobnich udaju</li>
          </ul>
        </div>
      </div>
    </Container>
  </header>
);

Footer.defaultProps = {
  user: null
};

Footer.propTypes = {
  user: PropTypes.shape({})
};

export default withTranslationsContext(Footer);
