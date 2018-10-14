import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost, votePost } from '../actions/PostActions'
import { timeToString } from '../utils/helpers'
import { Row, Col, Button, Glyphicon, Panel, ButtonToolbar } from 'react-bootstrap'

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
        <Panel>
          <Panel.Heading>
            <Row>
              <Col xs={8}>
                <h2>{post.title}</h2>
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
            <Row>
              <Col xs={6}>
                <div>{post.category}</div>
              </Col>
              <Col xs={6}>
                <ButtonToolbar className="pull-right">
                  <Button bsSize="xsmall" bsStyle="primary" onClick={() => this.props.history.push(`/${post.category}/${post.id}/edit`)}>
                    <Glyphicon glyph="glyphicon glyphicon-edit" />
                  </Button>
                  <Button bsSize="xsmall" bsStyle="danger" onClick={() => deletePost(post.id).then(this.props.history.push("/"))}>
                    <Glyphicon glyph="glyphicon glyphicon-trash" />
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
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