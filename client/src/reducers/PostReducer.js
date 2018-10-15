import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_VOTE_POST,
  RECEIVE_VOTE_POST,
  REQUEST_POST,
  RECEIVE_POST,
  REQUEST_EDIT_POST,
  RECEIVE_EDIT_POST,
} from '../actions/PostActions'

import {
  RECEIVE_ADD_COMMENT,
  RECEIVE_DELETE_COMMENT
} from '../actions/CommentActions'

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
    case REQUEST_POST:
      return state
    case RECEIVE_POST:
      if (!action.posts.id) {
        return []
      } else {
        return [action.posts]
      }
    case REQUEST_EDIT_POST:
      return state
    case RECEIVE_EDIT_POST:
      return state.map((post) => post.id === action.posts.id ? action.posts : post)
    case RECEIVE_ADD_COMMENT:
      return state.map((post) => post.id === action.comment.parentId ? {
        ...post,
        commentCount: post.commentCount + 1
      } : post)
    case RECEIVE_DELETE_COMMENT:
      return state.map((post) => post.id === action.comment.parentId ? {
        ...post,
        commentCount: post.commentCount - 1
      } : post)
    default:
      return state
  }
}