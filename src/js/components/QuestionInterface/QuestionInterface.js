import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import css  from './QuestionInterface.scss';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';

class QuestionInterface extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      note: this.props.note
    };

    this.saveQuestion = this.saveQuestion.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({ note: this.props.note });
    }
  }

  onNoteChange(e) {
    this.setState({ note: e.target.value });
  }

  saveQuestion(e, favourite = this.props.favourite) {
    this.props.onSaveQuestion(this.state.note, favourite);
  }

  render() {
    const { note, favourite, loading } = this.props;

    return (
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
              onIconClick={(e) => this.saveQuestion(e, !this.props.favourite)}
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

          <div className="froms__field-wrap">
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
              value={this.state.note}
              name="question-note"
              id="question-note"
              onChange={(e) => this.onNoteChange(e)}
            />
            <button
              className="question-interface__submit-note"
              onClick={this.saveQuestion}
              type="button"
            >
              Uložit poznámku
            </button>
          </div>
        </div>
      </div>
    );
  }
}

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

export default QuestionInterface;
