import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
} from '../actions/CommentActions'

export default function (state = [], action) {
  console.log(action)
  switch (action.type) {
    case REQUEST_COMMENTS:
      return state
    case RECEIVE_COMMENTS:
      return action.comments
    default:
      return state
  }
}
