import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost, votePost } from '../actions/PostActions'
import { timeToString } from '../utils/helpers'
import { Link } from 'react-router-dom'

class PostDetail extends Component {
  componentWillMount() {
    this.props.getPost(this.props.match.params.postId);
  }

  render() {
    const { post, deletePost, votePost } = this.props

    if (!post.id) {
      return (
        <div>
          <h2>Post not Found</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{post.title}</h2>
          <div>{post.category}</div>
          <div>by {post.author}</div>
          <div>{timeToString(new Date(post.timestamp))}</div>
          <div>Comments: {post.commentCount}</div>
          <div>Votes: {post.voteScore}</div>
          <div>{post.body}</div>
          <div><Link to={`/${post.category}/${post.id}/edit`}>Edit</Link></div>
          <div><button href="#" onClick={() => deletePost(post.id)}>Delete</button ></div>
          <div><button href="#" onClick={() => votePost(post.id, "upVote")}>Vote Up</button ></div>
          <div><button href="#" onClick={() => votePost(post.id, "downVote")}>Vote Down</button ></div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts[0] || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    votePost: (id, vote) => dispatch(votePost(id, vote)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)