import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../actions/PostActions'
import { Link } from 'react-router-dom'

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
    const { posts, deletePost } = this.props

    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
              <div onClick={() => deletePost(post.id)}>Delete</div>
            </div>
          </li>
        ))}
      </ul>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);