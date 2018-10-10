import * as firebase from 'firebase/app';
import 'firebase/auth';

const createUser = (email, password) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.warn(`Unable to create user ${email}. Got following error: ${errorCode} ${errorMessage}`);
    });
}

export default createUser;
