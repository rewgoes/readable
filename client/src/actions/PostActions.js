import {
  fetchPostsApi,
  fetchCategoryPostsApi,
  deletePostApi,
  votePostApi,
  fetchPostApi,
  addPostApi,
  editPostApi
} from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function fetchPosts(category) {
  return function (dispatch) {
    dispatch(requestPosts())

    if (!category || category === "all") {
      fetchPostsApi().then(
        result => {
          dispatch(receivePosts(result))
        }
      )
    } else {
      fetchCategoryPostsApi(category).then(
        result => {
          dispatch(receivePosts(result))
        }
      )
    }
  }
}

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
function requestDeletePost() {
  return {
    type: REQUEST_DELETE_POST
  }
}

export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST'
function receiveDeletePost(posts) {
  return {
    type: RECEIVE_DELETE_POST,
    posts
  }
}

export const deletePost = (id) =>
  (dispatch) => {
    dispatch(requestDeletePost())

    return new Promise((resolve) => {
      deletePostApi(id).then(
        result => {
          dispatch(receiveDeletePost(result))
          resolve(result)
        }
      )
    });
  }

export const REQUEST_VOTE_POST = 'REQUEST_VOTE_POST'
function requestVotePost() {
  return {
    type: REQUEST_VOTE_POST
  }
}

export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
function receiveVotePost(posts) {
  return {
    type: RECEIVE_VOTE_POST,
    posts
  }
}

export function votePost(id, vote) {
  return function (dispatch) {
    dispatch(requestVotePost())

    votePostApi(id, vote).then(
      result => {
        dispatch(receiveVotePost(result))
      }
    )
  }
}

export const SORT_POSTS = 'SORT_POSTS'
export function sortPosts(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  }
}

export const REQUEST_POST = 'REQUEST_POST'
function requestPost() {
  return {
    type: REQUEST_POST
  }
}

export const RECEIVE_POST = 'RECEIVE_POST'
function receivePost(posts) {
  return {
    type: RECEIVE_POST,
    posts
  }
}

export function fetchPost(id) {
  return function (dispatch) {
    dispatch(requestPost())

    fetchPostApi(id).then(
      result => {
        dispatch(receivePost(result))
      }
    )
  }
}

export const REQUEST_ADD_POST = 'REQUEST_ADD_POST'
function requestAddPost() {
  return {
    type: REQUEST_ADD_POST
  }
}

export const RECEIVE_ADD_POST = 'RECEIVE_ADD_POST'
function receiveAddPost(posts) {
  return {
    type: RECEIVE_ADD_POST,
    posts
  }
}

export const submitPost = (post) =>
  (dispatch) => {
    dispatch(requestAddPost())

    return new Promise((resolve) => {
      addPostApi(post).then(
        result => {
          dispatch(receiveAddPost(result))
          resolve(result)
        }
      )
    });
  }

export const REQUEST_EDIT_POST = 'REQUEST_EDIT_POST'
function requestEditPost() {
  return {
    type: REQUEST_EDIT_POST
  }
}

export const RECEIVE_EDIT_POST = 'RECEIVE_EDIT_POST'
function receiveEditPost(posts) {
  return {
    type: RECEIVE_EDIT_POST,
    posts
  }
}

export const editPost = (postId, post) =>
  (dispatch) => {
    dispatch(requestEditPost())

    return new Promise((resolve) => {
      editPostApi(postId, post).then(
        result => {
          dispatch(receiveEditPost(result))
          resolve(result)
        }
      )
    });
  }