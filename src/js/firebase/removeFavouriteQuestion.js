import * as firebase from 'firebase/app';
import 'firebase/auth';

const removeFavouriteQuestion = (questionId, userId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('favourite-questions')
    .doc(`${questionId}`)
    .delete();

}

export default removeFavouriteQuestion;
