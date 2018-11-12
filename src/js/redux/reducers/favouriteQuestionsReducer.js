import FirebaseActions from '../../firebase';

const initState = {
  fetching: false,
  items: [],
  currentFavouriteQuestion: null
}

const SAVE_QUESTION_REQUEST = 'questions/SAVE_QUESTION_REQUEST';
const SAVE_QUESTION_SUCCESS = 'questions/SAVE_QUESTION_SUCCESS';

const ADD_FAVOURITE_QUESTION_REQUEST = 'questions/ADD_FAVOURITE_QUESTION_REQUEST';
const REMOVE_FAVOURITE_QUESTION_REQUEST = 'questions/REMOVE_FAVOURITE_QUESTION_REQUEST';
const REMOVE_FAVOURITE_QUESTION_FROM_STATE = 'questions/REMOVE_FAVOURITE_QUESTION_FROM_STATE';
const REMOVE_FAVOURITE_QUESTIONS_FROM_STATE = 'questions/REMOVE_FAVOURITE_QUESTIONS_FROM_STATE';
const FAVOURITE_QUESTIONS_CHANGED = 'questions/FAVOURITE_QUESTIONS_CHANGED';
const FAVOURITE_QUESTION_REQUEST = 'questions/FAVOURITE_QUESTION_REQUEST';
const FAVOURITE_QUESTIONS_REQUEST = 'questions/FAVOURITE_QUESTIONS_REQUEST';
const FAVOURITE_QUESTION_CHANGED = 'questions/FAVOURITE_QUESTION_CHANGED';

export const addFavouriteQuestion = (question, userId) => (dispatch) => {
  dispatch({
    type: ADD_FAVOURITE_QUESTION_REQUEST,
    payload: null
  });

  FirebaseActions.addFavouriteQuestion(question, userId)
    .catch(err => console.log('Error when adding favourite question: ', err));
}

export const removeFavouriteQuestion = (questionId, userId) => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTION_REQUEST,
    payload: null
  });

  FirebaseActions.removeFavouriteQuestion(questionId, userId)
    .catch(err => console.log('Error when removing favourite question: ', err));
}

export const removeFavouriteQuestionFromState = () => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTION_FROM_STATE,
    payload: null
  });
}

export const removeFavouriteQuestionsFromState = () => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTIONS_FROM_STATE,
    payload: []
  });
}

export const onFavouriteQuestionsChange = (userId) => (dispatch) => {
  dispatch({
    type: FAVOURITE_QUESTIONS_REQUEST,
    payload: null
  })

  const onChangeCallBack = (favouriteQuestions) => dispatch({
    type: FAVOURITE_QUESTIONS_CHANGED,
    payload: favouriteQuestions
  });

  return FirebaseActions.watchFavouriteQuestionsChange(userId, onChangeCallBack);
}

export const onFavouriteQuestionChange = (userId, questionId) => (dispatch) => {
  dispatch({ type: FAVOURITE_QUESTION_REQUEST, payload: null });

  const onChangeCallBack = (favouriteQuestion) => dispatch({
    type: FAVOURITE_QUESTION_CHANGED,
    payload: favouriteQuestion
  });

  return FirebaseActions.watchFavouriteQuestionChange(userId, questionId, onChangeCallBack);
}

export const saveQuestion = (question, userId) => (dispatch) => {
  dispatch({ type: SAVE_QUESTION_REQUEST, payload: null });

  FirebaseActions.saveQuestion(question, userId)
    .then((snapshot) => {
      dispatch({
        type: SAVE_QUESTION_SUCCESS,
        payload: null
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

export default (state = initState, action) => {
  switch(action.type) {
    case ADD_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case REMOVE_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case REMOVE_FAVOURITE_QUESTION_FROM_STATE:
      return {
        ...state,
        currentFavouriteQuestion: action.payload
      }
    case REMOVE_FAVOURITE_QUESTIONS_FROM_STATE:
      return {
        ...state,
        items: action.payload
      }
    case FAVOURITE_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case FAVOURITE_QUESTIONS_CHANGED:
      return {
        ...state,
        fetching: false,
        items: action.payload
      }
    case FAVOURITE_QUESTION_CHANGED:
      return {
        ...state,
        fetching: false,
        currentFavouriteQuestion: action.payload
      }
    case FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case SAVE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case SAVE_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false
      }
    default:
      return state;
  }
}
