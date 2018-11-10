import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './Header.scss';

import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import LoginFormContainer from '../LoginForm/LoginFormContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withTranslationsContext from '../../withTranslationsContext';

class Header extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loginFormOpen: false
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ loginFormOpen: false });
    }
  }

  handleLoginClick(e) {
    e.preventDefault();

    this.setState(prevState => ({ loginFormOpen: !prevState.loginFormOpen }));
  }

  render() {
    return (
      <header className="header">
        <Container classNames="header__container">
          <Logo />

          <div className="header__login-block">
            {
              !this.props.user &&
              <a
                className="header__login-block__login-link"
                href="#"
                onClick={(e) => this.handleLoginClick(e)}
              >
                <FontAwesomeIcon
                  icon="user"
                  className="header__login-block__user-icon"
                />
                <span>Přihlášení</span>
              </a>
            }

            {
              this.props.user &&
              <div>
                <div>
                  <FontAwesomeIcon
                    icon="user"
                    className="header__login-block__user-icon"
                  />
                  <span>{this.props.user.email}</span>
                </div>

                <Link to="/oblibene-otazky">
                  Oblíbené otázky
                </Link>
              </div>
            }
          </div>

          {
            this.state.loginFormOpen &&
            <LoginFormContainer />
          }
        </Container>
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
