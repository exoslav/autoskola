import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css  from './TestPageStyles.scss';

import Question from '../../components/Question/Question';
import ResultList from '../../components/ResultList/ResultList';
import ThumbList from '../../components/TestThumbList/TestThumbList';

class TestPage extends React.Component {
  render() {
    const { questions, activeQuestion, answeredQuestions, showResults, onAnswerClick, onSaveTest, setActiveQuestion } = this.props;

    return (
      <Fragment>
        {
          !showResults &&
          <div className="test__wrapper">
            <div className="test__active-question">
              {
                activeQuestion &&
                <Question
                  bold
                  questionId={activeQuestion.id}
                  questionText={activeQuestion.question}
                  answers={activeQuestion.answers}
                  answeredIndex={activeQuestion.answeredIndex}
                  onAnswerClick={onAnswerClick}
                />
              }
            </div>

            <div className="test__thumb-list__wrapper">
              <ThumbList
                listTitle="Seznam otázek v testu:"
                questions={questions}
                onThumbItemClick={setActiveQuestion}
              />
            </div>

            <div className="test__footer">
              <button
                onClick={this.props.onTestEvaluation}
                type="button"
              >
                Vyhodnotit test
              </button>

              {
                showResults &&
                questions.length !== answeredQuestions.length &&
                <strong>
                  {`Odpověděli jste na ${answeredQuestions.length} otázek z ${questions.length}.`}
                </strong>
              }
            </div>
          </div>
        }

        {
          showResults &&
          <Fragment>
            <h1>Vyhodnocení testu</h1>

            <div>
              <strong>Počet bodů {}</strong>
            </div>

            <ResultList results={questions} />

            <button
              type="button"
              onClick={onSaveTest}
            >
              Ulozit tento test
            </button>
          </Fragment>
        }
      </Fragment>
    );
  }
}

TestPage.defaultProps = {
  fetching: false,
  showResults: false,
  questions: [],
  answeredQuestions: [],
  setActiveQuestion: () => {},
  onSaveTest: () => {},
  onTestEvaluation: () => {},
  onAnswerClick: () => {}
};

TestPage.propTypes = {
  fetching: PropTypes.bool,
  showResults: PropTypes.bool,
  questions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  answeredQuestions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  setActiveQuestion: PropTypes.func,
  onSaveTest: PropTypes.func,
  onTestEvaluation: PropTypes.func,
  onAnswerClick: PropTypes.func
};

export default TestPage;
