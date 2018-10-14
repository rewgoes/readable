import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments, deleteComment, voteComment } from '../actions/CommentActions'
import { timeToString } from '../utils/helpers'
import { Row, Col, Button, Glyphicon, Panel, ButtonToolbar } from 'react-bootstrap'

class Comments extends Component {
  componentWillMount() {
    this.props.getComments(this.props.match.params.postId)
  }

  render() {
    const { comments, deleteComment, voteComment } = this.props
    const { category, postId } = this.props.match.params

    if (!comments || comments.length === 0) {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h3>Comments</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h4>No comments yet, be the first to comment!</h4>
            </Col>
          </Row>
        </Col>
      )
    } else {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h3>Comments</h3>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {comments.map((comment) => (
                <Panel key={comment.id}>
                  <Panel.Body>
                    <Row>
                      <Col xs={9} sm={10} lg={11}>
                        {comment.body}
                      </Col>
                      <Col xs={3} sm={2} lg={1} className="comment-status">
                        <Row>
                          <Col xs={12}>
                            <div className="pull-right">Votes: {comment.voteScore}</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <ButtonToolbar className="pull-right">
                              <Button bsSize="xsmall" bsStyle="primary" onClick={() => this.props.history.push(`/${category}/${postId}/comment/${comment.id}/edit`)}>
                                <Glyphicon glyph="glyphicon glyphicon-edit" />
                              </Button>
                              <Button bsSize="xsmall" bsStyle="danger" onClick={() => deleteComment(comment.id)}>
                                <Glyphicon glyph="glyphicon glyphicon-trash" />
                              </Button>
                            </ButtonToolbar>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel.Body>
                  <Panel.Footer>
                    <Row>
                      <Col xs={8}>
                        <div>by {comment.author}, on {timeToString(new Date(comment.timestamp))}</div>
                      </Col>
                      <Col xs={4}>
                        <ButtonToolbar className="pull-right">
                          <Button bsSize="small" onClick={() => voteComment(comment.id, "downVote")}> <Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
                          <Button bsSize="small" onClick={() => voteComment(comment.id, "upVote")}> <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /></Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </Panel.Footer>
                </Panel>
              ))}
            </Col>
          </Row>
        </Col>
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