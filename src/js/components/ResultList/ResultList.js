import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import css from './ResultList.scss';

import ResultListItem from '../ResultListItem/ResultListItem';

class ResultList extends Component {
  render() {
    const { results } = this.props;

    return (
      <Fragment>
        {
          results.length > 0 &&
          <ul>
            {
              results.map(result => (
                <ResultListItem
                  bold
                  questionId={result.id}
                  questionText={result.question}
                  answers={result.answers}
                  answeredIndex={result.answeredIndex}
                  answered={result.answered}
                  correct={result.correct}
                />
              ))
            }
          </ul>
        }
      </Fragment>
    );
  }
}

ResultList.defaultProps = {
  results: []
};

ResultList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({}))
};

export default ResultList;
