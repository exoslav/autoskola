import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css from './QuestionListHeader.scss';

import Icon from '../Icon/Icon';

const LINES = 'lines';
const GRID = 'grid';

class QuestionListHeader extends React.Component {
  render() {
    const { displayView, onDisplayViewChange } = this.props;

    return (
      <div className="question-list-header">
        <strong className="question-list-header__question-id">#</strong>
        <strong className="question-list-header__question-title">Název otázky</strong>

        <button
          type="button"
          className="question-list-header__lines-view"
          onClick={() => onDisplayViewChange(LINES)}
        >
          <Icon
            icon="align-justify"
            classNames={`
                question-list-header__lines-view__icon
                ${displayView === LINES ? ' question-list-header__lines-view__icon--active' : ''}
              `}
          />
        </button>

        <button
          type="button"
          className="question-list-header__grid-view"
          onClick={() => onDisplayViewChange(GRID)}
        >
          <Icon
            icon="th"
            classNames={`
                question-list-header__grid-view__icon
                ${displayView === GRID ? ' question-list-header__grid-view__icon--active' : ''}
              `}
          />
        </button>
      </div>
    );
  }
}

QuestionListHeader.propTypes = {
  displayView: PropTypes.string,
  onDisplayViewChange: PropTypes.func
};

QuestionListHeader.defaultProps = {
  displayView: LINES,
  handleGridViewClick: (LINES) => {}
};

export default QuestionListHeader;
