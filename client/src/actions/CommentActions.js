import {
  fetchPostCommentsApi,
  deleteCommentApi,
  voteCommentApi,
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

export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT'
function requestDeleteComment() {
  return {
    type: REQUEST_DELETE_COMMENT
  }
}

export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT'
function receiveDeleteComment(comments) {
  return {
    type: RECEIVE_DELETE_COMMENT,
    comments
  }
}

export function deleteComment(id) {
  return function (dispatch) {
    dispatch(requestDeleteComment())

    deleteCommentApi(id).then(
      result => {
        dispatch(receiveDeleteComment(result))
      }
    )
  }
}

export const REQUEST_VOTE_COMMENT = 'REQUEST_VOTE_COMMENT'
function requestVoteComment() {
  return {
    type: REQUEST_VOTE_COMMENT
  }
}

export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT'
function receiveVoteComment(comments) {
  return {
    type: RECEIVE_VOTE_COMMENT,
    comments
  }
}

export function voteComment(id, vote) {
  return function (dispatch) {
    dispatch(requestVoteComment())

    voteCommentApi(id, vote).then(
      result => {
        dispatch(receiveVoteComment(result))
      }
    )
  }
}