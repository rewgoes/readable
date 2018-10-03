import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class CategoryList extends Component {
  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props

    return (
      <ul className='category-list'>
        {categories.map((item) => (
          <li key={item.path}>
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);