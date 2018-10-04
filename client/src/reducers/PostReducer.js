import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/PostActions'

export default function (state = [], action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return state
    case RECEIVE_POSTS:
      return action.posts
    default:
      return state
  }
}