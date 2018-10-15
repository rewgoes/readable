import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitComment, fetchComments } from '../actions/CommentActions'
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap'
import { FieldGroup } from './widget/FieldGroup'
import { isEmpty } from '../utils/helpers'

class NewComment extends Component {
  state = {
    error: {
      body: false,
      author: false,
    },
    parentId: this.props.match.params.postId,
    comment: {
      parentId: this.props.match.params.postId,
      body: "",
      author: "",
    }
  }

  clearForm() {
    this.setState({
      ...this.state,
      comment: {
        parentId: this.props.match.params.postId,
        body: "",
        author: "",
      }
    })

  }

  validateAndSubmitComment(comment) {
    const error = {
      body: isEmpty(comment.body),
      author: isEmpty(comment.author),
    }

    this.setState({
      ...this.state,
      error
    })

    if (!(error.body || error.author)) {
      this.props.submitComment(comment).then(() => {
        this.props.fetchComments(this.state.parentId)
        this.clearForm()
      })
    }
  }

  render() {
    const { comment, error } = this.state

    return (
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <h3>New Comment</h3>
          </Col>
        </Row>
        <form>
          <Row className="row-flex">
            <Col xs={12} sm={10} md={11}>
              <FieldGroup
                id="body"
                type="text"
                label="Content"
                placeholder="Content"
                validationState={error.body ? "error" : null}
                componentClass="textarea"
                value={comment.body}
                onChange={(event) => this.setState({
                  error: {
                    ...error,
                    body: false
                  },
                  comment: {
                    ...comment,
                    body: event.target.value
                  }
                })}
              />
              <FieldGroup
                id="author"
                type="text"
                label="Author"
                validationState={error.author ? "error" : null}
                placeholder="Author"
                value={comment.author}
                onChange={(event) => this.setState({
                  error: {
                    ...error,
                    author: false
                  },
                  comment: {
                    ...comment,
                    author: event.target.value
                  }
                })}
              />
            </Col>
            <Col xs={3} sm={2} md={1} className="col-center">
              <ButtonToolbar bsClass="btn-group-vertical" className="pull-right">
                <Button bsStyle="success" type="submit" onClick={(event) => {
                  event.preventDefault()
                  this.validateAndSubmitComment(comment)
                }}>Submit</Button>
                <Button bsStyle="danger" type="submit" value="Clear" onClick={(event) => {
                  event.preventDefault()
                  this.clearForm()
                }}>Clear</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </form>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitComment: (comment) => dispatch(submitComment(comment)),
    fetchComments: (id) => dispatch(fetchComments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)