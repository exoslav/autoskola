import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';

import './Breadcrumbs.scss';

class Breadcrumbs extends PureComponent {
  render() {
    return (
      <div className="breadcrumbs">
        <ul className="breadcrums__list">
          {
            this.props.breadcrumbsRoutes.map((route, index) => (
              <li className="breadcrumbs__item">
                {
                  route.link &&
                  <Link
                    to={route.link}
                    className={`
                      breadcrumbs__link
                      ${index === 0 ? ' breadcrumbs__link--hp' : ''}
                      ${++index === this.props.breadcrumbsRoutes.length ? ' breadcrumbs__link--current' : ''}
                    `}
                  >
                    {
                      route.icon &&
                      <Icon
                        icon={route.icon}
                        size="small"
                      />
                    }
                    <span>{route.label}</span>
                  </Link>
                }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

Breadcrumbs.defaultProps = {
  breadcrumbsRoutes: [{
    label: 'Domů',
    icon: 'home',
    link: '/'
  }]
};

Breadcrumbs.propTypes = {
  breadcrumbsRoutes: PropTypes.string
};

export default Breadcrumbs;
