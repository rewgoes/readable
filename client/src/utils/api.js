const API_URL = "http://localhost:3001"
const API_AUTH = "READABLE_AUTH"

const headers = {
  'Accept': 'application/json',
  'Authorization': API_AUTH
}

/**
 * Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
 * 
 * GET /categories
 */
export function fetchCategoriesApi() {
  return fetch(`${API_URL}/categories`, { headers })
    .then((res) => res.json())
}

/**
 * Get all of the posts for a particular category.
 * 
 * GET /:category/posts
 * 
 * @param {string} category category name
 */
export function fetchCategoryPostsApi(category) {
  return fetch(`${API_URL}/${category}/posts`, { headers })
    .then((res) => res.json())
}

/**
 * Get all of the posts. Useful for the main page when no category is selected.
 * 
 * GET /posts
 */
export function fetchPostsApi() {
  return fetch(`${API_URL}/posts`, { headers })
    .then((res) => res.json())
}

/**
 * Add a new post.
 * 
 * POST /posts
 * 
 * @param {object} postValues Post's title, body, author and category
 */
export function addPostApi(postValues) {
  const post = {
    id: require('uuid/v1')(),
    timestamp: Date.now(),
    ...postValues
  }
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then((res) => res.json())
}

/**
 * Get the details of a single post.
 * 
 * GET /posts/:id
 * 
 * @param {string} postId Post ID
 */
export function fetchPostApi(postId) {
  return fetch(`${API_URL}/posts/${postId}`, { headers })
    .then((res) => res.json())
}

/**
 * Used for voting on a post.
 * 
 * POST /posts/:id
 * 
 * @param {string} postId Post ID
 * @param {string} vote Either "upVote" or "downVote".
 * 
 */
export function votePostApi(postId, vote) {
  return fetch(`${API_URL}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: vote
    })
  }).then((res) => res.json())
}

/**
 * Edit the details of an existing post.
 * 
 * PUT /posts/:id
 * 
 * @param {string} postId Post ID
 * @param {object} postValues Post with title and/or body
 */
export function editPostApi(postId, postValues) {
  const { title, body } = postValues
  const post = {
    title,
    body
  }
  return fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then((res) => res.json())
}

/**
 * Sets the deleted flag for a post to 'true'. 
 * Sets the parentDeleted flag for all child comments to 'true'.
 * 
 * DELETE /posts/:id
 * 
 * @param {string} postId Post ID
 */
export function deletePostApi(postId) {
  return fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers
  }).then((res) => res.json())
}

/**
 * Get all the comments for a single post.
 * 
 * GET /posts/:id/comments
 * 
 * @param {string} postId Post ID
 */
export function fetchPostCommentsApi(postId) {
  return fetch(`${API_URL}/posts/${postId}/comments`, { headers })
    .then((res) => res.json())
}

/**
 * Add a comment to a post.
 * 
 * POST /comments
 * 
 * @param {object} commentValues Comments's body, author and parentId
 */
export function addCommentApi(commentValues) {
  const comment = {
    id: require('uuid/v1')(),
    timestamp: Date.now(),
    ...commentValues
  }
  return fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then((res) => res.json())
}

/**
 * Get the details for a single comment.
 * 
 * GET /comments/:id
 * 
 * @param {string} commentId Comment ID
 */
export function fetchCommentApi(commentId) {
  return fetch(`${API_URL}/comments/${commentId}`, { headers })
    .then((res) => res.json())
}

/**
 * Used for voting on a comment.
 * 
 * POST /comments/:id
 * 
 * @param {string} commentId Comment ID
 * @param {string} vote Either "upVote" or "downVote".
 */
export function voteCommentApi(commentId, vote) {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: vote
    })
  }).then((res) => res.json())
}

/**
 * Edit the details of an existing comment.
 * 
 * PUT /comments/:id
 * 
 * @param {string} commentId Comment ID
 * @param {object} commentValues Comment values with body.
 */
export function editCommentApi(commentId, commentValues) {
  const { body } = commentValues
  const comment = {
    timestamp: Date.now,
    body
  }
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then((res) => res.json())
}

/**
 * Sets a comment's deleted flag to true.
 * 
 * DELETE /comments/:id
 * 
 * @param {string} commentId Comment ID
 */
export function deleteCommentApi(commentId) {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then((res) => res.json())
}