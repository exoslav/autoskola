import * as firebase from 'firebase/app';
import 'firebase/firestore';

const getQuestionsCollections = (collectionId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db.collection(`otazky/${collectionId}/otazky`).get();
}

export default getQuestionsCollections;
