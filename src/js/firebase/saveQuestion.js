import * as firebase from 'firebase/app';

const saveQuestion = (question, userId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('saved-questions')
    .doc(`${question.id}`)
    .set({ ...question });
}

export default saveQuestion;
