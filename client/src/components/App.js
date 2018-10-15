import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryList from './CategoryList'
import Posts from './Posts'
import PostDetail from './PostDetail'
import { Link } from 'react-router-dom'
import NewPost from './NewPost'
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
            <Row>
              <EditComment {...props} />
            </Row>
          )} />

          <Route exact path="/:category?" render={(props) => (
            <Row>
              <CategoryList {...props} />
              <Posts {...props} />
            </Row>
          )} />

          <Route exact path="/:category/:postId" render={(props) => (
            <Row>
              <PostDetail {...props} />
            </Row>
          )} />

          <Route exact path="/:category/:postId/edit" render={(props) => (
            <Row>
              <EditPost {...props} />
            </Row>
          )} />
        </Switch>
      </Grid>
    );
  }
}

export default App