import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/CategoryActions'
import { fetchPosts } from '../actions/PostActions'
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isEmpty } from '../utils/helpers'

class CategoryList extends Component {
  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, getPosts } = this.props

    return (
      <Col sm={3}>
        <Row>
          <Col md={12}>
            <h2>Categories</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ListGroup>
              {categories.map((item) => (
                <ListGroupItem
                  key={item.path}
                  active={item.path === this.props.match.params.category || (isEmpty(this.props.match.params.category) && item.path === "all")}
                  onClick={() => {
                    this.props.history.push(item.path === 'all' ? '/' : `/${item.path}`)
                    getPosts(item.path)
                  }}>
                  {item.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getPosts: (category) => dispatch(fetchPosts(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);