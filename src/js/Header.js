import React from 'react';

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        {
          this.props.user &&
          <div>
            Přihlášený uživatel: {this.props.user.email}
          </div>
        }
      </header>
    );
  }
}

export default Header;
