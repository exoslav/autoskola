import * as firebase from 'firebase/app';

const deployQuestions = (questionsSet) => {
  const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

  const promises = [];

  for (let i = 0; i < questionsSet.length; i++) {
    promises.push(
      db
        .collection('otazky')
        .doc(`${questionsSet[i].id}`)
        .set({ ...questionsSet[i] })
    );
  }


  Promise.all([...promises])
    .then((values) => {
      console.log(values);
    });
}

export default deployQuestions;
