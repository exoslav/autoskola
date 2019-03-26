import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose, pure, withHandlers, withStateHandlers } from 'recompose'

import './QuestionListItem.scss';

import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import AnswerList from '../AnswerList/AnswerList';

const QuestionListItem = ({
  id,
  question,
  note,
  favourite,
  open,
  answers,
  correctAnswer,
  onItemClick,
  answeredCorrectly,
  onButtonClick,
  redirect
}) => (
  <li className={`question-list-item ${open ? 'question-list-item--open' : ''}`}>
    <div
      onClick={onItemClick}
      className={`question-list-item__question-block ${open ? 'question-list-item__question-block--open' : ''}`}
    >
      <strong className="question-list-item__item-id">{id}</strong>
      <span className="question-list-item__title">{question}</span>

      {
        (favourite || note) &&
        <span className="question-list-item__icons">
        {
          note &&
          <Icon
            iconClassName="sticky-note"
            icon={[note ? 'fas' : 'far', 'sticky-note']}
          />
        }

          {
            favourite &&
            <Icon
              iconClassName="star"
              icon={[favourite ? 'fas' : 'far', 'star']}
            />
          }
      </span>
      }

      <Icon
        iconClassName={`
          question-list-item__open-close-icon
          ${open ? ' question-list-item__open-close-icon--open' : 'question-list-item__open-close-icon--close'}
        `}
        icon={`${open ? 'chevron-up' : 'chevron-down'}`}
      />
    </div>

    {
      open &&
      <div className="question-list-item__open-block">
        <div className="question-list-item__answers-block">
          <AnswerList
            answers={answers}
            correctAnswer={correctAnswer}
          />
        </div>

        <Button
          text="Přejít na detail otázky"
          onButtonClick={onButtonClick}
          classNames={['button--white', 'question-list-item__to-detail-question-button']}
          icon="chevron-right"
          iconPosition="right"
        />

        {
          redirect &&
          <Redirect
            push
            to={`/otazky/pravidla-provozu/${id}`}
          />
        }
      </div>
    }
  </li>
);

QuestionListItem.defaultProps = {
  favourite: false,
  note: false,
  redirect: false
};

QuestionListItem.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  note: PropTypes.bool,
  favourite: PropTypes.bool,
  redirect: PropTypes.bool
};

export default compose(
  pure,
  withStateHandlers(
    { redirect: false },
    {
      onButtonClick: () => () => ({ redirect: true })
    }
  ),
  withHandlers({
    onItemClick: (props) => () => props.setOpenItemId(props.id)
  })
)(QuestionListItem);
