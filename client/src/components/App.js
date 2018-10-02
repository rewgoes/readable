import React, { Component } from 'react'
import CategoryList from './CategoryList'

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
        </div>
      </div>
    );
  }
}

export default App