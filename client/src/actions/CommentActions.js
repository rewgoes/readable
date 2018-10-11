import {
  fetchPostCommentsApi,
} from '../utils/api'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
function requestComments() {
  return {
    type: REQUEST_COMMENTS
  }
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function fetchComments(postId) {
  return function (dispatch) {
    dispatch(requestComments())

    fetchPostCommentsApi(postId).then(
      result => {
        dispatch(receiveComments(result))
      }
    )
  }
}