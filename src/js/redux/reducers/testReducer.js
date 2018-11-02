import FirebaseActions from '../../firebase';

const initState = {
  savingTest: false
}

const SAVE_TEST_REQUEST = 'auth/SAVE_TEST_REQUEST';
const SAVE_TEST_ERROR = 'auth/SAVE_TEST_ERROR';
const SAVE_TEST_SUCCESS = 'auth/SAVE_TEST_SUCCESS';

export const saveTest = (userId, testData) => (dispatch) => {
  dispatch({ type: SAVE_TEST_REQUEST, payload: null });

  FirebaseActions.saveTest(userId, testData)
    .then(data => {
      dispatch({ type: SAVE_TEST_SUCCESS, payload: null });
    })
    .catch((error) => {
      dispatch({ type: SAVE_TEST_ERROR, payload: error });
    });
}

export default (state = initState, action) => {
  switch(action.type) {
    case SAVE_TEST_REQUEST:
      return {
        ...state,
        savingTest: true
      }
    case SAVE_TEST_ERROR:
      return {
        ...state,
        error: action.payload,
        savingTest: false
      }
    case SAVE_TEST_SUCCESS:
      return {
        ...state,
        error: false,
        savingTest: false
      }
    default:
      return state;
  }
}
