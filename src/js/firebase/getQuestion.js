import * as firebase from 'firebase/app';

export const getQuestion = (collectionId, questionId) => {
  const db = firebase.firestore();

  console.log(db);

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

