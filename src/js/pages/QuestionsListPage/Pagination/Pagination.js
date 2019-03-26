import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { compose, withStateHandlers } from 'recompose';

import PaginationItem from './PaginationItem';
import { createPagination } from './createPagination';

import './Pagination.scss';

const Pagination = ({ pages, onPageChanged, classNames }) => (
  <div className={`pagiantion ${classNames}`}>
    {
      pages.length > 0 &&
      <ul className="pagination__list">
        {
          pages.map((page) => (
            <PaginationItem
              label={page.label}
              toPage={page.toPage}
              active={page.active}
              link={`/otazky/pravidla-provozu?page=${page.toPage}`}
              onItemClick={onPageChanged}
              disabled={page.disabled}
            />
          ))
        }
      </ul>
    }
  </div>
);

Pagination.defaultProps = {
  pages: [],
  onPaginationItemClick: () => {},
  classNames: ''
};

Pagination.propTypes = {
  classNames: PropTypes.string,
  pages: PropTypes.arrayOf(),
  categoryId: PropTypes.string.isRequired,
  onPaginationItemClick: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const limit = state.questions.listingPageQuestionsLimit;
  const totalQuestions = state.questions.items.find(q => q.id === props.categoryId).totalQuestions;
  const totalPages = totalQuestions % limit === 0 ? totalQuestions/limit : Math.floor(totalQuestions/limit) + 1;

  return { totalPages };
};

export default compose(
  connect(mapStateToProps),
  withStateHandlers(
    (props) => {
      const query = queryString.parse(location.hash.split('?')[1]);
      const currentPage = query.page ? parseInt(query.page) : 1;

      return {
        pages: createPagination(currentPage, props.totalPages),
      };
    },
    {
      onPageChanged: (state, props) => (value, disabled, active) => {
        if (disabled || active) {
          return;
        }

        props.onPaginationItemClick(value);

        return {
          pages: createPagination(value, props.totalPages)
        };
      }
    }
  )
)(Pagination);
