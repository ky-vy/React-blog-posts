import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/Fetch'
import { Link } from 'react-router-dom'

import Header from './Header'
import '../styles/ShowPost.css'

class ShowPost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props

    if (!post) {
      return (
        <div>
          <Header colored={true} button="Add" />
          <div>Loading...</div>
        </div>
      )
    }

    return (
      <div>
        <Header colored={true} button="Add" />

        <div className="container">
          <div className="Panel">
            <h2 className="Title1">{post.title}</h2>
            <div>
              <Link className="btn" to="/posts">
                Back
              </Link>
              <button className="btn" onClick={this.onDeleteClick}>
                Delete post
              </button>
            </div>
          </div>
          <div className="Card">
            <h4 className="Categories">Categories: {post.categories}</h4>
            <div className="PostContent">{post.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(ShowPost)
