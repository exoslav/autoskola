import { combineReducers } from 'redux'
import authReducer from './authReducer'
import questionsReducer from './questionsReducer'
import licenseCategoriesReducer from './licenseCategoriesReducer'

export default combineReducers({
  auth: authReducer,
  licenseCategories: licenseCategoriesReducer,
  questions: questionsReducer
})
