import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST
} from '../actions/PostActions'

export default function (state = [], action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return state
    case RECEIVE_POSTS:
      return action.posts
    case REQUEST_DELETE_POST:
      return state
    case RECEIVE_DELETE_POST:
      return state.filter((post) => post.id !== action.posts.id)
    default:
      return state
  }
}