import * as firebase from 'firebase/app';

const getQuestionsCollections = (collectionId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db.collection(`sady-otazek/${collectionId}/otazky`).get();
}

export default getQuestionsCollections;
