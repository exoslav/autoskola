import * as firebase from 'firebase/app';
import 'firebase/auth';

const deleteFavouriteQuestion = (questionId) => {
  const userId = firebase.auth().currentUser.uid;

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

export default deleteFavouriteQuestion;
