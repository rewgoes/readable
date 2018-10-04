import React, { Component } from 'react'
import CategoryList from './CategoryList'
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <div>
          <div>
            <CategoryList />
          </div>
          <div>
            <Posts />
          </div>
        </div>
      </div>
    );
  }
}

export default App