import * as firebase from 'firebase/app';

const getQuestionById = (questionId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection('otazky')
    .doc(`${questionId}`)
    .get();
}

export default getQuestionById;
