import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, votePost } from '../actions/PostActions'
import { Link } from 'react-router-dom'
import { timeToString } from '../utils/helpers'

class Posts extends Component {
  componentWillMount() {
    this.props.getPosts(this.getCurrentCategory())
  }

  getCurrentCategory() {
    if (this.props.match && this.props.match.params) {
      return this.props.match.params.category
    } else {
      return "all"
    }
  }

  render() {
    const { posts, deletePost, votePost } = this.props

    return (
      <div>
        <h2>Posts</h2>
        <div>
          <label htmlFor="sortSelector">Sort by:</label>
          <select onChange={event => { }} id="sortSelector">
            <option value='vote'>Vote</option>
            <option value='date'>Date</option>
          </select>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
                <div>by {post.author}</div>
                <div>{timeToString(new Date(post.timestamp))}</div>
                <div>Comment: {post.commentCount}</div>
                <div>Votes: {post.voteScore}</div>
                <div>{post.body}</div>
                <div><button href="#" onClick={() => deletePost(post.id)}>Delete</button ></div>
                <div><button href="#" onClick={() => votePost(post.id, "upVote")}>Vote Up</button ></div>
                <div><button href="#" onClick={() => votePost(post.id, "downVote")}>Vote Down</button ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (category) => dispatch(fetchPosts(category)),
    deletePost: (id) => dispatch(deletePost(id)),
    votePost: (id, vote) => dispatch(votePost(id, vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);