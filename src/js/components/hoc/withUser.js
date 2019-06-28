import React from 'react';
import { connect } from 'react-redux'

export default (BaseComponent) => {
  class withUser extends React.Component {
    render() {
      return (
        <BaseComponent
          {...this.props}
          user={this.props.user}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({ user: state.auth.user });

  return connect(mapStateToProps)(withUser);
}
