import { combineReducers } from 'redux'
import authReducer from './authReducer'
import questionFieldsReducer from './questionFieldsReducer'
import licenseCategoriesReducer from './licenseCategoriesReducer'

export default combineReducers({
  auth: authReducer,
  licenseCategories: licenseCategoriesReducer,
  questionFields: questionFieldsReducer
})
