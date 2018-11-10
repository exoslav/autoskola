import * as firebase from 'firebase/app';

export const watchFavouriteQuestionChange = (userId, questionId, callBack) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('favourite-questions')
    .doc(`${questionId}`)
    .onSnapshot((doc) => {
      callBack(doc.data());
    });
}

export default watchFavouriteQuestionChange;
