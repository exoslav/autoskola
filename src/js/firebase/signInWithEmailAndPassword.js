import * as firebase from 'firebase/app';
import 'firebase/auth';

const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
}

export default signInWithEmailAndPassword;
