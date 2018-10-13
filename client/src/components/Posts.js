import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, votePost, sortPosts } from '../actions/PostActions'
import { Link } from 'react-router-dom'
import { timeToString } from '../utils/helpers'
import { Row, Col, Button } from 'react-bootstrap'

class Posts extends Component {
  componentWillMount() {
    this.props.sortPosts("vote")
    this.props.getPosts(this.getCurrentCategory())
  }

  getCurrentCategory() {
    if (this.props.match && this.props.match.params) {
      return this.props.match.params.category
    } else {
      return "all"
    }
  }

  renderTop(sortPosts) {
    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <h2>Posts</h2>
          </Col>
          <Col xs={6}>
            <Button className="pull-right" bsStyle="link" onClick={() => this.props.history.push("/post/new")}>New post</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label htmlFor="sortSelector">Sort by:</label>
            <select onChange={event => sortPosts(event.target.value)} id="sortSelector">
              <option value='vote'>Vote</option>
              <option value='date'>Date</option>
            </select>
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { posts, deletePost, votePost, sortPosts, sort } = this.props
    const sortCurrentPosts = () => {
      switch (sort) {
        case "vote":
          return posts.sort((val1, val2) => (val2.voteScore - val1.voteScore))
        case "date":
          return posts.sort((val1, val2) => (val2.timestamp - val1.timestamp))
        default:
          return posts
      }
    }

    if (!posts || posts.length === 0) {
      return (
        <Col md={9}>
          {this.renderTop(sortPosts)}
          <h3>No posts yet, be the first to post!</h3>
        </Col>
      )
    } else {
      return (
        <Col sm={9}>
          {this.renderTop(sortPosts)}
          <ul>
            {sortCurrentPosts().map((post) => (
              <li key={post.id}>
                <div>
                  <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
                  <div>{post.category}</div>
                  <div>by {post.author}</div>
                  <div>{timeToString(new Date(post.timestamp))}</div>
                  <div>Comments: {post.commentCount}</div>
                  <div>Votes: {post.voteScore}</div>
                  <div>{post.body}</div>
                  <div><button href="#" onClick={() => deletePost(post.id)}>Delete</button ></div>
                  <div><button href="#" onClick={() => votePost(post.id, "upVote")}>Vote Up</button ></div>
                  <div><button href="#" onClick={() => votePost(post.id, "downVote")}>Vote Down</button ></div>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    sort: state.sort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (category) => dispatch(fetchPosts(category)),
    deletePost: (id) => dispatch(deletePost(id)),
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    sortPosts: (sortBy) => dispatch(sortPosts(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);