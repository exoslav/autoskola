import * as firebase from 'firebase/app';
import 'firebase/auth';

const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.warn(`Error in user sign in: ${errorCode}, ${errorMessage}`);
      });
}

export default signInWithEmailAndPassword;
