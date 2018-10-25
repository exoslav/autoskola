import * as firebase from 'firebase/app';
import 'firebase/firestore';

const getQuestionsCollections = (collectionId) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db.collection(`sady-otazek/${collectionId}/otazky`).get();
}

export const getAllQuestionsCollections = () => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  return db.collection(`otazky`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let subCollectionDocs = db.collection(`otazky/${doc.id}/otazky`)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log("Sub Document: ", doc.data());
            })
          }).catch(err => {
            console.log("Error getting sub-collection documents", err);
          })
      });

      console.log('test');
    })
    .catch((err) => {
      console.log(err);
    })
}

export default getQuestionsCollections;
