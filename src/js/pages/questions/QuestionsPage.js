import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import * as firebase from 'firebase/app';
import 'firebase/firestore';

class QuestionsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      header: '',
      perex: '',
      questionList: []
    };
  }

  componentDidMount() {
    const category = this.fetchCategory();

    this.setState({
      header: category.name,
      perex: category.perex,
    });

    const db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true
    });

    db.collection('otazky')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState(state => {
            const newQuestionList = [...state.questionList, doc.data()];

            return { questionList: newQuestionList };
          });
        });
      });
  }

  fetchCategory() {
    return this.props.questionFields.find(category => category.id === this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>{this.state.header}</h1>

        <p>{this.state.perex}</p>

        <ul>
          <li>Spusit náhodný test</li>
          <li>Spustit test od první otázky</li>
          <li>Nastavit si vlastní test ze zobrazených otázek</li>
        </ul>

        {
          this.state.questionList.length <= 0 &&
          <div>Loading questions...</div>
        }

        {
          this.state.questionList.length > 0 &&
          <ol>
            {
              this.state.questionList.map((q, index) => (
                <li>{q.name}</li>
              ))
            }
          </ol>
        }
      </div>
    );
  }
}

QuestionsPage.defaultProps = {
};

QuestionsPage.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    questionFields: state.questionFields
  };
}

export default connect(mapStateToProps)(QuestionsPage)
