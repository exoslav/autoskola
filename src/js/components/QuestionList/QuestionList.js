import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';

import QuestionListItem from '../QuestionListItem/QuestionListItem';

import './QuestionList.scss';

const QuestionList = ({ items, displayView, openItemId, setOpenItemId }) => (
  <Fragment>
    {
      items && items.length > 0 &&
      <ol className={`question-list question-list--${displayView}-view`}>
        {
          items.map((listItem) => {
            const { id, category, question, favourite, note, answers, correctAnswer } = listItem;

            return (
              <QuestionListItem
                key={id}
                id={id}
                question={question}
                favourite={favourite}
                note={note}
                link={`/otazky/${category}/${id}`}
                answers={answers}
                open={openItemId === id}
                setOpenItemId={setOpenItemId}
                correctAnswer={correctAnswer}
              />
            );
          })
        }
      </ol>
    }
  </Fragment>
);

QuestionList.defaultProps = {
  displayView: 'lines',
  items: []
};

QuestionList.propTypes = {
  displayView: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    note: PropTypes.bool,
    favourite: PropTypes.bool
  }))
};

export default compose(
  withStateHandlers(
    { openItemId: null },
    {
      setOpenItemId: ({ openItemId }) => (id) => ({ openItemId: id === openItemId ? null : id })
    }
  )
)(QuestionList);
