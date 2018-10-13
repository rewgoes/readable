import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryList from './CategoryList'
import Posts from './Posts'
import PostDetail from './PostDetail'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import NewPost from './NewPost'
import NewComment from './NewComment'
import EditPost from './EditPost'
import EditComment from './EditComment'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><Link to={`/`}>Readable</Link></h1>
        </header>
        <Switch>
          <Route exact path="/post/new" render={(props) => (
            <div>
              <div>
                <NewPost {...props} />
              </div>
            </div>
          )} />

          <Route exact path="/:category/:postId/comment/:commentId/edit" render={(props) => (
            <div>
              <div>
                <EditComment {...props} />
              </div>
            </div>
          )} />

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

          <Route exact path="/:category/:postId" render={(props) => (
            <div>
              <div>
                <PostDetail {...props} />
                <NewComment {...props} />
                <Comments {...props} />
              </div>
            </div>
          )} />

          <Route exact path="/:category/:postId/edit" render={(props) => (
            <div>
              <div>
                <EditPost {...props} />
              </div>
            </div>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App