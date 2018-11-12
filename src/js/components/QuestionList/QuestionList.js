import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionList.scss';

import QuestionListItem from '../QuestionListItem/QuestionListItem';

class QuestionList extends React.Component {

  render() {
    const { items, displayView } = this.props;

    return (
      <Fragment>
        {
          items && items.length > 0 &&
          <ol className={`question-list--${this.props.displayView}-view`}>
            {
              items.map((listItem) => {
                const { id, categoryId, question, favourite, note } = listItem;

                return (
                  <QuestionListItem
                    key={id}
                    id={id}
                    question={question}
                    favourite={favourite}
                    note={note}
                    link={`/otazky/${categoryId}/${id}`}
                  />
                );
              })
            }
          </ol>
        }
      </Fragment>
    );
  }
}

QuestionList.defaultProps = {
  displayView: 'lines',
  items: []
};

QuestionList.propTypes = {
  displayView: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    note: PropTypes.bool,
    favourite: PropTypes.bool
  }))
};

export default QuestionList;
