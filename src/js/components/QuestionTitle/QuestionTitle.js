import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionTitle.scss';

import Icon from '../Icon/Icon';

class QuestionTitle extends PureComponent {
  render() {
    const { bold, questionText, answered, correct } = this.props;

    return (
      <Fragment>
        {
          bold &&
          <strong className="question-title">
            {
              answered &&
              <Icon
                size="large"
                icon={`${correct ? 'check-circle' : 'times-circle'}`}
                iconClassName={`${correct ? 'check-circle' : 'times-circle'}`}
                customClassName="question-title__check-icon"
              />
            }
            {questionText}
          </strong>
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
  bold: false,
  answered: false
};

QuestionTitle.propTypes = {
  questionText: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  answered: PropTypes.bool,
  correct: PropTypes.bool
};

export default QuestionTitle;
