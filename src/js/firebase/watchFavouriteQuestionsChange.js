import * as firebase from 'firebase/app';
import 'firebase/auth';

export const watchFavouriteQuestionsChange = (userId, callBack) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('favourite-questions')
    .onSnapshot((collection) => {
      callBack(collection.docs.map(doc => doc.data()));
    });
}

export default watchFavouriteQuestionsChange;
