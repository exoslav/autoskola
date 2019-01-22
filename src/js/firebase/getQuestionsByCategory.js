import * as firebase from 'firebase/app';

const getQuestionsByCategory = (questionCategory, limit = 15) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection('otazky')
    .where('category', '==', questionCategory)
    .limit(limit)
    .get();

}

export default getQuestionsByCategory;
