import getQuestionsCollections from '../../firebase/getQuestionsCollections';

const initState = {
  fetching: false,
  items: [
    {
      id: 'pravidla-provozu',
      name: 'Pravidla provozu na pozemních komunikacích',
      icon: 'motorcycle',
      link: '/otazky/pravidla-provozu',
      perex: 'Otázky oheldně pravidel silničního provozu.'
    },
    {
      id: 'dopravni-znacky',
      name: 'Dopravní značky',
      icon: 'car-side',
      link: '/otazky/dopravni-znacky',
      perex: 'Otázky ohledně dopravních značek.'
    },
    {
      id: 'pravidla-bezpecne-jizdy',
      name: 'Zásady bezpečné jízdy',
      icon: 'truck',
      link: '/otazky/pravidla-bezpecne-jizdy',
      perex: 'Otázky ohledně bezpečné jízdy.'
    },
    {
      id: 'dopravni-situace',
      name: 'Dopravní situace',
      icon: 'bus',
      link: '/otazky/dopravni-situace',
      perex: 'Otázky ohledně dopravních situací.'
    },
    {
      id: 'predpisy-provozu-vozidel',
      name: 'Předpisy o podmínkách provozu vozidel',
      icon: 'bus',
      link: '/otazky/predpisy-provozu-vozidel',
      perex: 'Otázky ohledně předpisů vozidel.'
    },
    {
      id: 'predpisy-souvisejici-s-provozem',
      name: 'Předpisy související s provozem',
      icon: 'bus',
      link: '/otazky/predpisy-souvisejici-s-provozem',
      perex: 'Předpisy související s provozem.'
    },
    {
      id: 'zdravotnicka-priprava',
      name: 'Zdravotnická příprava',
      icon: 'bus',
      link: '/otazky/zdravotnicka-priprava',
      perex: 'Otázky ohledně zdravotnické přípravy.'
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

export const getQuestions = (categoryId) => (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST, payload: null });

  getQuestionsCollections(categoryId)
    .then((querySnapshot) => {
      let newQuestionsList = [];

      querySnapshot.forEach((doc) => {
        newQuestionsList = [...newQuestionsList, doc.data()];
      });

      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: { categoryId, newQuestionsList }
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

export default (state = initState, action) => {
  switch(action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
      break;
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              questions: action.payload.newQuestionsList
            }
          }

          return item;
        })
      }
      break;
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
      break;
    default:
      return state;
  }
}
