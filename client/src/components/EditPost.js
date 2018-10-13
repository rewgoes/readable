import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost, fetchPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryActions'

class EditPost extends Component {
  componentWillMount() {
    this.props.getCategories()
    this.props.getPost(this.props.match.params.postId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      post: nextProps.post
    })
  }

  state = {
    post: {
      title: "",
      body: "",
      author: "",
      category: "",
    },
    postId: this.props.match.params.postId,
    category: this.props.match.params.category,
  }

  render() {
    const { post, postId } = this.state
    const { categories, editPost } = this.props

    if (!post) {
      return (
        <div>
          <h2>Post not Found</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Edit Post</h2>
          <form>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" placeholder="Title" value={post.title} onChange={(event) => this.setState({
                post: {
                  ...post,
                  title: event.target.value
                }
              })} />
            </div>
            <div>
              <label htmlFor="body">Content:</label>
              <textarea id="body" placeholder="Content" value={post.body} onChange={(event) => this.setState({
                post: {
                  ...post,
                  body: event.target.value
                }
              })} />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input type="text" id="author" disabled={true} placeholder="Author" value={post.author} />
            </div>
            <div>
              <label htmlFor="sortSelector">Category:</label>
              <select id="sortSelector" disabled={true} value={post.category}>
                <option value="">Select a category</option>
                {categories && categories.map((category) => (
                  category.name !== "all" &&
                  <option
                    key={category.name}
                    value={category.name} >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div><input type="submit" value="Edit" onClick={(event) => {
              event.preventDefault()
              editPost(post.id, { title: post.title, body: post.body }).then((post) => {
                if (post) {
                  this.props.history.push(`/${post.category}/${post.id}`)
                } else {
                  this.props.history.push("/")
                }
              })
            }} /></div>
            <div><input type="button" value="Cancel" onClick={(event) => {
              event.preventDefault()
              this.props.history.push(`/${post.category}/${postId}`)
            }} /></div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  let newPost = {
    title: "",
    body: "",
    author: "",
    category: "",
  }
  if (state.posts && state.posts[0]) {
    newPost = {
      ...state.posts[0]
    }
  }

  return {
    categories: state.categories,
    post: {
      ...newPost
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    getCategories: () => dispatch(fetchCategories()),
    editPost: (postId, post) => dispatch(editPost(postId, post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)