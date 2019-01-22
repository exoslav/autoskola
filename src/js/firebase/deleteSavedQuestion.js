import * as firebase from 'firebase/app';

const deleteSavedQuestion = (questionId, userId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('saved-questions')
    .doc(`${questionId}`)
    .delete();

}

export default deleteSavedQuestion;
