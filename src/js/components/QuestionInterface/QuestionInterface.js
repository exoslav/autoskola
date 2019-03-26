import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers, withStateHandlers } from 'recompose';

import './QuestionInterface.scss';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

const QuestionInterface = ({ note, favourite, loading, saveQuestion, onNoteChange, noteText }) => (
  <div className={`
    question-interface
    ${loading ? ' question-interface--loading' : ''}
   `}>

    {
      loading && <Loader classNames="question-interface__loader"/>
    }

    <div>
      <div className="froms__field-wrap">
        <Icon
          iconClassName="star"
          icon={[favourite ? 'fas' : 'far', 'star']}
          onIconClick={(e) => saveQuestion(e, !favourite)}
        />
        <span>
          {
            loading
              ? 'Načítám...'
              : favourite
                ? 'Odstranit z oblíbených'
                : 'Přidat do oblíbených'
          }
        </span>
      </div>

      <div className="question-interface__note froms__field-wrap">
        <label
          className="froms__label"
          htmlFor="question-note"
        >
          <Icon
            iconClassName="sticky-note"
            icon={[note ? 'fas' : 'far', 'sticky-note']}
            onIconClick={() => {}}
          />
          <span>Poznámka k otázce:</span>
        </label>
        <textarea
          value={noteText}
          name="question-note"
          id="question-note"
          onChange={(e) => onNoteChange(e)}
        />

        <Button
          classNames={['button--red', 'question-interface__submit-note']}
          onButtonClick={saveQuestion}
          type="button"
          text="Uložit poznámku"
        />
      </div>
    </div>
  </div>
);

QuestionInterface.propTypes = {
  note: PropTypes.string,
  loading: PropTypes.bool,
  favourite: PropTypes.bool,
  onSaveQuestion: PropTypes.func
};

QuestionInterface.defaultProps = {
  note: '',
  loading: false,
  favourite: false,
  onSaveQuestion: () => {}
};

export default compose(
  withStateHandlers(
    ({ note }) => ({ noteText: note }),
    {
      onNoteChange: () => e => ({ noteText: e.target.value }),
      saveQuestion: ({ noteText }, props) => (e, favourite = props.favourite) => {
        props.onSaveQuestion(noteText, favourite);
      },
      setNewNoteFromProps: () => noteText => ({ noteText })
    }
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.note !== prevProps.note) {
        this.props.setNewNoteFromProps(this.props.note);
      }
    }
  })
)(QuestionInterface);
