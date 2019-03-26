import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends React.PureComponent {
  render() {
    const iconClasses = [`icon-component icon-component--${this.props.iconClassName}`];

    iconClasses.push(`icon-component--size-${this.props.size}`);

    if (this.props.customClassName) {
      iconClasses.push(this.props.customClassName);
    }

    return (
      <FontAwesomeIcon
        onClick={this.props.onIconClick}
        className={iconClasses.join(' ')}
        icon={this.props.icon}
      />
    );
  }
}

Icon.defaultProps = {
  customClassName: '',
  size: 'medium',
  onIconClick: () => {}
};

Icon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  iconClassName: PropTypes.string,
  customClassName: PropTypes.string,
  classNames: PropTypes.string,
  onIconClick: PropTypes.func
};

export default Icon;

/*
* regular icon as: <FontAwesomeIcon icon="wine-glass-alt" />
* solid icon as: <FontAwesomeIcon icon={['fas', 'check-square']} />
* readme: https://medium.com/@christine_tran/adding-font-awesome-icons-to-react-projects-c9fb627e3161
*/