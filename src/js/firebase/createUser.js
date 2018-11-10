import * as firebase from 'firebase/app';

const EMAIL_IN_USE_ALREADY = 'auth/email-already-in-use';
const INVALID_EMAIL = 'auth/invalid-email';
const OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed';
const WEAK_PASSWORD = 'auth/weak-password';

const createUser = (email, password) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
}

export default createUser;
