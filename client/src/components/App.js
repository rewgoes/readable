import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <Route exact path="/:category?" render={(props) => (
          <div>
            <div>
              <CategoryList {...props} />
            </div>
            <div>
              <Posts {...props} />
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default App