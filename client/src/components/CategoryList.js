import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/CategoryActions'
import { fetchPosts } from '../actions/PostActions'
import { Link } from 'react-router-dom'

class CategoryList extends Component {
  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, getPosts } = this.props

    return (
      <div>
        <h2>Categories</h2>
        <ul className='category-list'>
          {categories.map((item) => (
            <li key={item.path}>
              <h3>
                <Link to={item.path === 'all' ? '/' : `/${item.path}`} onClick={() => getPosts(item.path)}>
                  {item.name}
                </Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
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