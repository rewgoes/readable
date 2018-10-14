import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, votePost, sortPosts } from '../actions/PostActions'
import { Link } from 'react-router-dom'
import { timeToString } from '../utils/helpers'
import { Row, Col, Button, FormGroup, InputGroup, FormControl, Glyphicon, Panel, ButtonToolbar } from 'react-bootstrap'

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
          <Col xs={12}>
            <h2>Posts</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={5} md={4}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-sort" /></InputGroup.Addon>
                <FormControl componentClass="select" onChange={event => sortPosts(event.target.value)} id="sortSelector">
                  <option value='vote'>Vote</option>
                  <option value='date'>Date</option>
                </FormControl>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6} sm={7} md={8}>
            <Button className="pull-right" bsStyle="primary" onClick={() => this.props.history.push("/post/new")}>New post</Button>
          </Col>
        </Row>
      </Fragment >
    )
  }

  render() {
    const { posts, votePost, sortPosts, sort } = this.props
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
        <Col sm={9}>
          {this.renderTop(sortPosts)}
          <h3>No posts yet, be the first to post!</h3>
        </Col>
      )
    } else {
      return (
        <Col sm={9}>
          {this.renderTop(sortPosts)}
          {sortCurrentPosts().map((post) => (
            <Panel key={post.id}>
              <Panel.Heading>
                <Row>
                  <Col xs={8}>
                    <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
                  </Col>
                  <Col xs={4}>
                    <ButtonToolbar className="pull-right">
                      <Button bsSize="small" onClick={() => votePost(post.id, "downVote")}> <Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
                      <Button bsSize="small" onClick={() => votePost(post.id, "upVote")}> <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /></Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <Row>
                  <Col xs={5}>by {post.author}</Col>
                  <Col xs={7}><span className="pull-right">{timeToString(new Date(post.timestamp))}</span></Col>
                </Row>
                <div>{post.category}</div>
              </Panel.Heading>
              <Panel.Body>
                <div>{post.body}</div>
              </Panel.Body>
              <Panel.Footer>
                <Row>
                  <Col xs={6}>Comments: {post.commentCount}</Col>
                  <Col xs={6}>
                    <span className="pull-right">
                      Votes: {post.voteScore}
                    </span>
                  </Col>
                </Row>
              </Panel.Footer>
            </Panel>
          ))}
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
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    sortPosts: (sortBy) => dispatch(sortPosts(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);