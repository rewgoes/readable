import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryActions'

class NewPost extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  state = {
    post: {
      title: "",
      body: "",
      author: "",
      category: "",
    }
  }

  render() {
    const { post } = this.state
    const { categories, submitPost } = this.props

    return (
      <div>
        <h2>New Post</h2>
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
            <input type="text" id="author" placeholder="Author" value={post.author} onChange={(event) => this.setState({
              post: {
                ...post,
                author: event.target.value
              }
            })} />
          </div>
          <div>
            <label htmlFor="sortSelector">Category:</label>
            <select id="sortSelector" value={post.category} onChange={(event) => this.setState({
              post: {
                ...post,
                category: event.target.value
              }
            })}>
              <option value="" defaultValue>Select a category</option>
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
          <div><input type="submit" value="Submit" onClick={(event) => {
            event.preventDefault()
            submitPost(post).then(() => {
              this.props.history.push("/")
            })
          }} /></div>
          <div><input type="button" value="Cancel" onClick={(event) => {
            event.preventDefault()
            this.props.history.push("/")
          }} /></div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    submitPost: (post) => dispatch(submitPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)