import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions'

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
    const { posts } = this.props

    return (
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);