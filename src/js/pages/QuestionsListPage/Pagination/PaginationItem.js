import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, pure, withHandlers } from 'recompose';

import './PaginationItem.scss';

const PaginationItem = ({ label, link, handleOnClick, active, disabled }) => (
  <li className="pagination-item">
    <Link
      to={link}
      className={`
        pagination-item__link
        ${active ? ' pagination-item__link--active' : ''}
        ${disabled ? ' pagination-item__link--disabled' : ''}
      `}
      onClick={handleOnClick}
    >
      {label}
    </Link>
  </li>
);

PaginationItem.defaultProps = {
  onItemClick: () => {}
};

PaginationItem.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onItemClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

export default compose(
  pure,
  withHandlers({
    handleOnClick: (props) => props.onItemClick(props.toPage, props.disabled, props.active)
  })
)(PaginationItem);
