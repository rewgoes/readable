import {
  SORT_POSTS
} from '../actions/PostActions'

export default function (state = { sort: 'vote' }, action) {
  switch (action.type) {
    case SORT_POSTS:
      return action.sortBy
    default:
      return state;
  }
}