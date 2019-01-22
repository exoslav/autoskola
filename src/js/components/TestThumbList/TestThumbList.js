import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css from './TestThumbList.scss';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import ThumbListItem from '../TestThumbListItem/TestThumbListItem';

class TestThumbList extends React.Component {

  render() {
    const { questions, listTitle, onThumbItemClick } = this.props;

    return (
      <Fragment>
        {
          listTitle &&
          <QuestionTitle
            bold
            questionText={listTitle}
          />
        }

        {
          questions.length > 0 &&
          <ol className="test-thumb-list">
            {
              questions.map((q, index) => (
                <ThumbListItem
                  id={q.id}
                  key={index}
                  index={index}
                  questionText={q.question}
                  active={q.active}
                  answered={q.answered}
                  onItemClick={onThumbItemClick}
                />
              ))
            }
          </ol>
        }
      </Fragment>
    );
  }
}

TestThumbList.defaultProps = {
  questions: [],
  listTitle: '',
  onThumbItemClick: () => {}
};

TestThumbList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    questionText: PropTypes.string
  })),
  listTitle: PropTypes.string,
  onThumbItemClick: PropTypes.func
};

export default TestThumbList;
