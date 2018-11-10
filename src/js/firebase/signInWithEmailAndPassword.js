import * as firebase from 'firebase/app';

const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
}

export default signInWithEmailAndPassword;
