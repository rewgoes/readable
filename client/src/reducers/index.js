import { combineReducers } from 'redux'
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions'

const initialState = []

function category(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return state
    case RECEIVE_CATEGORIES:
      return [{
        name: 'all',
        path: 'all'
      }, ...action.categories.categories]
    default:
      return state
  }
}

export default combineReducers({
  categories: category
})