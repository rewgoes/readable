import { fetchPostsApi } from '../utils/api'

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

export function fetchPosts() {
  return function (dispatch) {
    dispatch(requestPosts())

    fetchPostsApi().then(
      result => {
        dispatch(receivePosts(result))
      }
    )
  }
}