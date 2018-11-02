import * as firebase from 'firebase/app';
import 'firebase/auth';

export const saveTest = (userId, test) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db
    .collection(`users`)
    .doc(`${userId}`)
    .collection('tests')
    .doc(`${test.id}`)
    .set({ ...test });
}

export default saveTest;
