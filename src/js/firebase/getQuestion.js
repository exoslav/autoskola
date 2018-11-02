import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const getQuestion = (collectionId, questionId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection('sady-otazek')
    .doc(`${collectionId}`)
    .collection('otazky')
    .doc(`${questionId}`)
    .get();
}

