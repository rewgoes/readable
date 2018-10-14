import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryActions'
import { Row, Col, Button, FormGroup, ButtonToolbar, FormControl, ControlLabel } from 'react-bootstrap'
import { isEmpty } from '../utils/helpers'
import { FieldGroup } from './widget/FieldGroup'

class NewPost extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  state = {
    error: {
      title: false,
      body: false,
      author: false,
      category: false,
    },
    post: {
      title: "",
      body: "",
      author: "",
      category: "",
    }
  }

  validateAndSubmitPost(post) {
    const error = {
      title: isEmpty(post.title),
      body: isEmpty(post.body),
      author: isEmpty(post.author),
      category: isEmpty(post.category),
    }

    this.setState({
      ...this.state,
      error
    })

    if (!(error.title || error.body || error.author || error.category)) {
      this.props.submitPost(post).then((post) => {
        if (post) {
          this.props.history.push(`/${post.category}/${post.id}`)
        } else {
          this.props.history.push("/")
        }
      })
    }
  }

  render() {
    const { post, error } = this.state
    const { categories } = this.props

    return (
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <h2>New Post</h2>
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
            validationState={error.author ? "error" : null}
            placeholder="Author"
            value={post.author}
            onChange={(event) => this.setState({
              error: {
                ...error,
                author: false
              },
              post: {
                ...post,
                author: event.target.value
              }
            })}
          />

          <FormGroup validationState={error.category ? "error" : null}>
            <ControlLabel>Category</ControlLabel>
            <FormControl id="sortSelector" componentClass="select" value={post.category} onChange={(event) => this.setState({
              error: {
                ...error,
                category: false
              },
              post: {
                ...post,
                category: event.target.value
              }
            })}>
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
              this.validateAndSubmitPost(post)
            }}>Submit</Button>
            <Button bsStyle="danger" type="submit" value="Cancel" onClick={(event) => {
              event.preventDefault()
              this.props.history.push("/")
            }}>Cancel</Button>
          </ButtonToolbar>
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
    getCategories: () => dispatch(fetchCategories()),
    submitPost: (post) => dispatch(submitPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)