import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionTitle.scss';

class QuestionTitle extends PureComponent {
  render() {
    const { bold, questionText } = this.props;

    return (
      <Fragment>
        {
          bold &&
          <strong className="question-title">{questionText}</strong>
        }

        {
          !bold &&
          <span className="question-title">{questionText}</span>
        }
      </Fragment>
    );
  }
}

QuestionTitle.defaultProps = {
  bold: false
};

QuestionTitle.propTypes = {
  questionText: PropTypes.string.isRequired,
  bold: PropTypes.bool
};

export default QuestionTitle;
