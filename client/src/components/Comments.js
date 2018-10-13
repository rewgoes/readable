import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments, deleteComment, voteComment } from '../actions/CommentActions'
import { timeToString } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Comments extends Component {
  componentWillMount() {
    this.props.getComments(this.props.match.params.postId)
  }

  render() {
    const { comments, deleteComment, voteComment } = this.props
    const { category, postId } = this.props.match.params

    if (!comments || comments.length === 0) {
      return (
        <div>
          <h3>No comments yet, be the first to comment!</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <div>
                  <div>by {comment.author}</div>
                  <div>{timeToString(new Date(comment.timestamp))}</div>
                  <div>Votes: {comment.voteScore}</div>
                  <div>{comment.body}</div>
                  <div><Link to={`/${category}/${postId}/comment/${comment.id}/edit`}>Edit</Link></div>
                  <div><button href="#" onClick={() => deleteComment(comment.id)}>Delete</button ></div>
                  <div><button href="#" onClick={() => voteComment(comment.id, "upVote")}>Vote Up</button ></div>
                  <div><button href="#" onClick={() => voteComment(comment.id, "downVote")}>Vote Down</button ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id) => dispatch(fetchComments(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)