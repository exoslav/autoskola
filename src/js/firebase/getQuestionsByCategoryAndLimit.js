import * as firebase from 'firebase/app';

const getQuestionsByCategoryAndLimit = (questionCategory, startAfter, limit = 15) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection('otazky')
    .where('category', '==', questionCategory)
    .orderBy('id')
    .startAfter(startAfter)
    .limit(limit)
    .get();
}

export default getQuestionsByCategoryAndLimit;
