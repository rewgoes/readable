import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostDetail extends Component {
  render() {
    return (
      <ul>
        <li>Bla</li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);