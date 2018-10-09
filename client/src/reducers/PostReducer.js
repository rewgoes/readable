import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_VOTE_POST,
  RECEIVE_VOTE_POST
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
    case REQUEST_VOTE_POST:
      return state
    case RECEIVE_VOTE_POST:
      return state.map((post) => post.id === action.posts.id ? action.posts : post)
    default:
      return state
  }
}