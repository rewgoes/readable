import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost, fetchPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryActions'
import { isEmpty } from '../utils/helpers'
import { Row, Col, Button, FormGroup, ButtonToolbar, FormControl, ControlLabel } from 'react-bootstrap'
import { FieldGroup } from './widget/FieldGroup'

class EditPost extends Component {
  componentWillMount() {
    this.props.getCategories()
    this.props.getPost(this.props.match.params.postId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      post: nextProps.post
    })
  }

  state = {
    error: {
      title: false,
      body: false,
    },
    post: {
      title: "",
      body: "",
      author: "",
      category: "",
    },
    postId: this.props.match.params.postId,
    category: this.props.match.params.category,
  }

  validateAndEditPost(id, post) {
    const error = {
      title: isEmpty(post.title),
      body: isEmpty(post.body),
    }

    this.setState({
      ...this.state,
      error
    })

    if (!(error.title || error.body)) {
      this.props.editPost(id, post).then((post) => {
        if (post) {
          this.props.history.push(`/${post.category}/${post.id}`)
        } else {
          this.props.history.push("/")
        }
      })
    }
  }

  render() {
    const { post, postId, error } = this.state
    const { categories } = this.props

    if (isEmpty(post)) {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h2>Post not Found</h2>
            </Col>
          </Row>
        </Col>
      )
    } else {
      return (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h2>Edit Post</h2>
            </Col>
          </Row>
          <form>
            <FieldGroup
              id="title"
              type="text"
              label="Title"
              placeholder="Title"
              validationState={error.title ? "error" : null}
              value={post.title}
              onChange={(event) => this.setState({
                error: {
                  ...error,
                  title: false
                },
                post: {
                  ...post,
                  title: event.target.value
                }
              })}
            />
            <FieldGroup
              id="body"
              type="text"
              label="Content"
              placeholder="Content"
              validationState={error.body ? "error" : null}
              componentClass="textarea"
              value={post.body}
              onChange={(event) => this.setState({
                error: {
                  ...error,
                  body: false
                },
                post: {
                  ...post,
                  body: event.target.value
                }
              })}
            />
            <FieldGroup
              id="author"
              type="text"
              label="Author"
              placeholder="Author"
              value={post.author}
              disabled={true}
            />
            <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl id="sortSelector" disabled={true} componentClass="select" value={post.category} >
                <option value="" defaultValue>Select a category</option>
                {categories && categories.map((category) => (
                  category.name !== "all" &&
                  <option
                    key={category.name}
                    value={category.name} >
                    {category.name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <ButtonToolbar>
              <Button bsStyle="success" type="submit" onClick={(event) => {
                event.preventDefault()
                this.validateAndEditPost(post.id, { title: post.title, body: post.body })
              }}>Edit</Button>
              <Button bsStyle="danger" type="submit" value="Cancel" onClick={(event) => {
                event.preventDefault()
                this.props.history.push(`/${post.category}/${postId}`)
              }}>Cancel</Button>
            </ButtonToolbar>
          </form>
        </Col>
      )
    }
  }
}

const mapStateToProps = (state) => {
  let newPost = {
    title: "",
    body: "",
    author: "",
    category: "",
  }
  if (state.posts && state.posts[0]) {
    newPost = {
      ...state.posts[0]
    }

    return {
      categories: state.categories,
      post: {
        ...newPost
      }
    }
  } else {
    return {
      categories: state.categories,
      post: null
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    getCategories: () => dispatch(fetchCategories()),
    editPost: (postId, post) => dispatch(editPost(postId, post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)