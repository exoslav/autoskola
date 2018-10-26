import * as firebase from 'firebase/app';
import 'firebase/auth';

const getFavouriteQuestion = (questionId) => {
  const userId = firebase.auth().currentUser.uid;

  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('favourite-questions')
    .get();

}

export default getFavouriteQuestion;
