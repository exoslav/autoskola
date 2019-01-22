import FirebaseActions from '../../firebase';

const initState = {
  fetching: true,
  lastVisible: null,
  items: [
    {
      id: 'pravidla-provozu',
      name: 'Pravidla provozu na pozemních komunikacích',
      icon: 'traffic-light',
      link: '/otazky/pravidla-provozu',
      perex: 'Otázky oheldně pravidel silničního provozu.',
      questions: []
    },
    {
      id: 'dopravni-znacky',
      name: 'Dopravní značky',
      icon: 'sign',
      link: '/otazky/dopravni-znacky',
      perex: 'Otázky ohledně dopravních značek.',
      questions: []
    },
    {
      id: 'pravidla-bezpecne-jizdy',
      name: 'Zásady bezpečné jízdy',
      icon: 'car-crash',
      link: '/otazky/pravidla-bezpecne-jizdy',
      perex: 'Otázky ohledně bezpečné jízdy.',
      questions: []
    },
    {
      id: 'dopravni-situace',
      name: 'Dopravní situace',
      icon: 'bus',
      link: '/otazky/dopravni-situace',
      perex: 'Otázky ohledně dopravních situací.',
      questions: []
    },
    {
      id: 'predpisy-provozu-vozidel',
      name: 'Předpisy o podmínkách provozu vozidel',
      icon: 'car-battery',
      link: '/otazky/predpisy-provozu-vozidel',
      perex: 'Otázky ohledně předpisů vozidel.',
      questions: []
    },
    {
      id: 'predpisy-souvisejici-s-provozem',
      name: 'Předpisy související s provozem',
      icon: 'chalkboard-teacher',
      link: '/otazky/predpisy-souvisejici-s-provozem',
      perex: 'Předpisy související s provozem.',
      questions: []
    },
    {
      id: 'zdravotnicka-priprava',
      name: 'Zdravotnická příprava',
      icon: 'briefcase-medical',
      link: '/otazky/zdravotnicka-priprava',
      perex: 'Otázky ohledně zdravotnické přípravy.',
      questions: []
    }
  ]
}

const GET_QUESTIONS_REQUEST = 'questions/GET_QUESTIONS_REQUEST';
const GET_QUESTIONS_SUCCESS = 'questions/GET_QUESTIONS_SUCCESS';
const REMOVE_QUESTIONS_FROM_CATEGORY = 'questions/REMOVE_QUESTIONS_FROM_CATEGORY';

export const removeQuestionsFromCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: REMOVE_QUESTIONS_FROM_CATEGORY,
    payload: { categoryId, newQuestionsList: [] }
  });
}

export const getQuestions = (categoryId, startAfter) => (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST, payload: null });

  FirebaseActions.getQuestionsByCategory(categoryId, startAfter)
    .then(querySnapshot => dispatchFromQuerySnapshot(querySnapshot, categoryId, dispatch))
    .catch((err) => {
      console.log(err);
    })
}

export const getQuestionsWithLimit = (categoryId, startAfter) => (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST, payload: null });

  FirebaseActions.getQuestionsByCategoryAndLimit(categoryId, startAfter)
    .then(querySnapshot => dispatchFromQuerySnapshot(querySnapshot, categoryId, dispatch))
    .catch((err) => {
      console.log(err);
    })
}

export const getQuestionById = (categoryId, questionId) => (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST, payload: null });

  FirebaseActions.getQuestionById(questionId)
    .then((snapshot) => {
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: {
          categoryId,
          questions: [snapshot.data()]
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

function dispatchFromQuerySnapshot(snapshot, categoryId, dispatch) {
  const questions = [];
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  snapshot.forEach((doc) => {
    questions.push(doc.data());
  });

  dispatch({
    type: GET_QUESTIONS_SUCCESS,
    payload: { categoryId, questions, lastVisible }
  });
}

export default (state = initState, action) => {
  switch(action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        lastVisible: action.payload.lastVisible,
        items: state.items.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              questions: action.payload.questions
            }
          }

          return item;
        })
      }
    case REMOVE_QUESTIONS_FROM_CATEGORY:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              questions: action.payload.newQuestionsList
            };
          }

          return item;
        })
      }
    default:
      return state;
  }
}
