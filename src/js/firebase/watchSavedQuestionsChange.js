import * as firebase from 'firebase/app';

export const watchSavedQuestionsChange = (userId, callBack) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('saved-questions')
    .onSnapshot((collection) => {
      callBack(collection.docs.map(doc => doc.data()));
    });
}

export default watchSavedQuestionsChange;
