import React, { Component } from 'react'
import { fetchCategories } from '../utils/api'

class CategoryList extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    fetchCategories().then(result => {
      this.setState({
        categories: [{
          name: 'all',
          path: 'all'
        }, ...result.categories]
      })
    });
  }

  render() {
    const { categories } = this.state

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

export default CategoryList