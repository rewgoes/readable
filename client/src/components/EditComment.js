import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment, fetchComment } from '../actions/CommentActions'
import { isEmpty } from '../utils/helpers'
import { Row, Col, Button, ButtonToolbar, } from 'react-bootstrap'
import { FieldGroup } from './widget/FieldGroup'

class NewPost extends Component {
  componentWillMount() {
    this.props.getComment(this.props.match.params.commentId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      comment: nextProps.comment
    })
  }

  state = {
    error: {
      body: false,
    },
    parentId: this.props.match.params.postId,
    category: this.props.match.params.category,
    comment: {
      body: "",
      author: "",
    }
  }

  validateAndEditComment(id, comment) {
    const error = {
      body: isEmpty(comment.body),
    }

    this.setState({
      ...this.state,
      error
    })

    if (!(error.body)) {
      this.props.editComment(id, { body: comment.body }).then((result) => {
        if (result) {
          this.props.history.push(`/${this.state.category}/${this.state.parentId}`)
        } else {
          this.props.history.push("/")
        }
      })
    }
  }

  render() {
    const { comment, parentId, category, error } = this.state

    if (isEmpty(comment)) {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h2>Comment not Found</h2>
            </Col>
          </Row>
        </Col>
      )
    } else {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h2>Edit Comment</h2>
            </Col>
          </Row>
          <form>
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
              placeholder="Author"
              value={comment.author}
              disabled={true}
            />
            <ButtonToolbar>
              <Button bsStyle="success" type="Edit" onClick={(event) => {
                event.preventDefault()
                this.validateAndEditComment(comment.id, { body: comment.body })
              }}>Edit</Button>
              <Button bsStyle="danger" type="submit" value="Cancel" onClick={(event) => {
                event.preventDefault()
                this.props.history.push(`/${category}/${parentId}`)
              }}>Cancel</Button>
            </ButtonToolbar>
          </form>
        </Col>
      )
    }
  }
}

const mapStateToProps = (state) => {
  let newComment = {
    body: "",
    author: "",
  }
  if (state.comments && state.comments[0]) {
    newComment = {
      ...state.comments[0]
    }
  }

  return {
    comment: {
      ...newComment
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (id) => dispatch(fetchComment(id)),
    editComment: (id, comment) => dispatch(editComment(id, comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)