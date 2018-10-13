import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitComment, fetchComments } from '../actions/CommentActions'

class NewPost extends Component {
  state = {
    parentId: this.props.match.params.postId,
    comment: {
      parentId: this.props.match.params.postId,
      body: "",
      author: "",
    }
  }

  clearForm() {

  }

  render() {
    const { comment, parentId } = this.state
    const { submitComment, fetchComments } = this.props

    return (
      <div>
        <h3>Comment</h3>
        <form>
          <div>
            <label htmlFor="body">Content:</label>
            <textarea id="body" placeholder="Content" value={comment.body} onChange={(event) => this.setState({
              comment: {
                ...comment,
                body: event.target.value
              }
            })} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" placeholder="Author" value={comment.author} onChange={(event) => this.setState({
              comment: {
                ...comment,
                author: event.target.value
              }
            })} />
          </div>
          <div><input type="submit" value="Submit" onClick={(event) => {
            event.preventDefault()
            submitComment(comment).then(() => {
              fetchComments(parentId)
            })
          }} /></div>
          <div><input type="button" value="Clear" onClick={(event) => {
            event.preventDefault()
            this.clearForm()
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
    submitComment: (comment) => dispatch(submitComment(comment)),
    fetchComments: (id) => dispatch(fetchComments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)