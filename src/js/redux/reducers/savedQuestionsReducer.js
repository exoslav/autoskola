import FirebaseActions from '../../firebase';

const initState = {
  fetching: false,
  items: []
}

const SAVED_QUESTIONS_REQUEST = 'questions/SAVED_QUESTIONS_REQUEST';
const SAVED_QUESTION_SUCCESS = 'questions/SAVED_QUESTION_SUCCESS';
const REMOVE_SAVED_QUESTIONS_FROM_STATE = 'questions/REMOVE_SAVED_QUESTIONS_FROM_STATE';
const SAVED_QUESTIONS_CHANGED = 'questions/SAVED_QUESTIONS_CHANGED';

export const deleteSavedQuestion = (questionId, userId) => (dispatch) => {
  dispatch({
    type: SAVED_QUESTIONS_REQUEST,
    payload: null
  });

  FirebaseActions.deleteSavedQuestion(questionId, userId)
    .catch(err => console.log('Error when removing saved question: ', err));
}

export const removeSavedQuestionsFromState = () => (dispatch) => {
  dispatch({
    type: REMOVE_SAVED_QUESTIONS_FROM_STATE,
    payload: null
  });
}

export const onSavedQuestionsChange = (userId) => (dispatch) => {
  dispatch({
    type: SAVED_QUESTIONS_REQUEST,
    payload: null
  })

  const onChangeCallBack = (savedQuestions) => {
    dispatch({
      type: SAVED_QUESTIONS_CHANGED,
      payload: savedQuestions
    });
  };

  return FirebaseActions.watchSavedQuestionsChange(userId, onChangeCallBack);
}

export const saveQuestion = (question, userId) => (dispatch) => {
  dispatch({ type: SAVED_QUESTIONS_REQUEST, payload: null });

  FirebaseActions.saveQuestion(question, userId)
    .then((snapshot) => {
      dispatch({
        type: SAVED_QUESTION_SUCCESS,
        payload: null
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

export default (state = initState, action) => {
  switch(action.type) {
    case SAVED_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case REMOVE_SAVED_QUESTIONS_FROM_STATE:
      return {
        ...state,
        items: []
      }
    case SAVED_QUESTIONS_CHANGED:
      return {
        ...state,
        fetching: false,
        items: [...action.payload]
      }
    case SAVED_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false
      }
    default:
      return state;
  }
}
