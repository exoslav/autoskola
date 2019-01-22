import createUser from './createUser';
import getQuestionById from './getQuestionById';
import saveQuestion from './saveQuestion';
import setPersistence from './setPersistence';
import onAuthStateChanged from './onAuthStateChanged';
import initializeFirebaseApp from './initializeFirebaseApp';
import signInWithEmailAndPassword from './signInWithEmailAndPassword';
import deleteSavedQuestion from './deleteSavedQuestion';
import getQuestionsByCategory from './getQuestionsByCategory';
import watchSavedQuestionsChange from './watchSavedQuestionsChange';
import getQuestionsByCategoryAndLimit from './getQuestionsByCategoryAndLimit';
import saveTest from './saveTest';

export default {
  saveTest,
  getQuestionById,
  createUser,
  saveQuestion,
  setPersistence,
  onAuthStateChanged,
  initializeFirebaseApp,
  signInWithEmailAndPassword,
  deleteSavedQuestion,
  getQuestionsByCategory,
  watchSavedQuestionsChange,
  getQuestionsByCategoryAndLimit
};

// https://stackoverflow.com/questions/48718421/import-only-auth-and-firestore-from-firebase
// https://itnext.io/hooking-up-firebase-to-your-redux-store-a5e799cf84c4
// https://stackoverflow.com/questions/30910704/how-do-i-link-each-user-to-their-data-in-firebase
// https://angularfirebase.com/lessons/firestore-nosql-data-modeling-by-example/
// https://stackoverflow.com/questions/46554091/firebase-firestore-collection-count