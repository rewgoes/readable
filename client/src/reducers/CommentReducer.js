import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_DELETE_COMMENT,
  RECEIVE_DELETE_COMMENT,
  REQUEST_VOTE_COMMENT,
  RECEIVE_VOTE_COMMENT,
} from '../actions/CommentActions'

export default function (state = [], action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return state
    case RECEIVE_COMMENTS:
      return action.comments
    case REQUEST_DELETE_COMMENT:
      return state
    case RECEIVE_DELETE_COMMENT:
      return state.filter((comments) => comments.id !== action.comments.id)
    case REQUEST_VOTE_COMMENT:
      return state
    case RECEIVE_VOTE_COMMENT:
      return state.map((comment) => comment.id === action.comments.id ? action.comments : comment)
    default:
      return state
  }
}
