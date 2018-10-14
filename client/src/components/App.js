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
import { Row, Grid, Col } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Grid className="App show-grid">
        <Row className="App-header">
          <Col xs={12}>
            <h1 className="App-title"><Link to={`/`}>Readable</Link></h1>
          </Col>
        </Row>
        <Switch>
          <Route exact path="/post/new" render={(props) => (
            <Row>
              <NewPost {...props} />
            </Row>
          )} />

          <Route exact path="/:category/:postId/comment/:commentId/edit" render={(props) => (
            <div>
              <div>
                <EditComment {...props} />
              </div>
            </div>
          )} />

          <Route exact path="/:category?" render={(props) => (
            <Row>
              <CategoryList {...props} />
              <Posts {...props} />
            </Row>
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
      </Grid>
    );
  }
}

export default App