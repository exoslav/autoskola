import * as firebase from 'firebase/app';

const addFavouriteQuestion = (question, userId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('favourite-questions')
    .doc(`${question.id}`)
    .set({ ...question });
}

export default addFavouriteQuestion;
