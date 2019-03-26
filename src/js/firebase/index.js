import createUser from './createUser';
import getQuestionById from './getQuestionById';
import saveQuestion from './saveQuestion';
import setPersistence from './setPersistence';
import onAuthStateChanged from './onAuthStateChanged';
import initializeFirebaseApp from './initializeFirebaseApp';
import signInWithEmailAndPassword from './signInWithEmailAndPassword';
import deleteSavedQuestion from './deleteSavedQuestion';
import watchSavedQuestionsChange from './watchSavedQuestionsChange';
import saveTest from './saveTest';
import getQuestionsByCount from './getQuestionsByCount'

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
  watchSavedQuestionsChange,
  getQuestionsByCount
};

// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
// https://vasanthk.gitbooks.io/react-bits/gotchas/01.pure-render-checks.html
// https://blog.jimmycai.com/p/firestore-pagination/
// https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
// https://stackoverflow.com/questions/48718421/import-only-auth-and-firestore-from-firebase
// https://itnext.io/hooking-up-firebase-to-your-redux-store-a5e799cf84c4
// https://stackoverflow.com/questions/30910704/how-do-i-link-each-user-to-their-data-in-firebase
// https://angularfirebase.com/lessons/firestore-nosql-data-modeling-by-example/
// https://stackoverflow.com/questions/46554091/firebase-firestore-collection-count