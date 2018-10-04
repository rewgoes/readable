import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions/CategoryActions'

export default function (state = [], action) {
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