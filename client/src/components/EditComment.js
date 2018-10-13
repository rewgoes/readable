import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment, fetchComment } from '../actions/CommentActions'

class NewPost extends Component {
  componentWillMount() {
    this.props.getComment(this.props.match.params.commentId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      comment: nextProps.comment
    })
  }

  state = {
    parentId: this.props.match.params.postId,
    category: this.props.match.params.category,
    comment: {
      body: "",
      author: "",
    }
  }

  render() {
    const { comment, parentId, category } = this.state
    const { editComment } = this.props

    return (
      <div>
        <h2>Edit Comment</h2>
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
            <input type="text" id="author" disabled={true} placeholder="Author" value={comment.author} onChange={(event) => this.setState({
              comment: {
                ...comment,
                author: event.target.value
              }
            })} />
          </div>
          <div><input type="submit" value="Edit" onClick={(event) => {
            event.preventDefault()
            editComment(comment.id, { body: comment.body }).then((comment) => {
              if (comment) {
                this.props.history.push(`/${category}/${parentId}`)
              } else {
                this.props.history.push("/")
              }
            })
          }} /></div>
          <div><input type="button" value="Cancel" onClick={(event) => {
            event.preventDefault()
            this.props.history.push(`/${category}/${parentId}`)
          }} /></div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let newComment = {
    body: "",
    author: "",
  }
  if (state.comments && state.comments[0]) {
    newComment = {
      ...state.comments[0]
    }
  }

  return {
    comment: {
      ...newComment
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (id) => dispatch(fetchComment(id)),
    editComment: (id, comment) => dispatch(editComment(id, comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)