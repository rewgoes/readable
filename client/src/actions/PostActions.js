import {
  fetchPostsApi,
  fetchCategoryPostsApi
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