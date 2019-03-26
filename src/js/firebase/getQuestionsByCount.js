import * as firebase from 'firebase/app';

const getQuestionsByCount = (questionCategory, startAt = 1, limit = 15) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection('otazky')
    .where('category', '==', questionCategory)
    .orderBy('count')
    .startAt(startAt)
    .endAt(startAt + limit - 1)
    .limit(limit)
    .get();
}

export default getQuestionsByCount;
