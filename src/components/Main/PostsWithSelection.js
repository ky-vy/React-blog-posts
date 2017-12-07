import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  selectStart,
  hover,
  selectFinish,
  delIconHover,
  delIconLeave
} from '../../actions/SelectionMode'
import { deletePost, fetchPosts } from '../../actions/Fetch'

import '../../styles/PostsWithSelection.css'

class PostsWithDelMode extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  /*using data attributes(data-foo="foo"/ e.target.dataset.foo) on events which
 pass data to handlers not to create new functions every time in render or in
 currying functions (known performance issue) or not to create additional
 components for event handlers(to be able to pass data straightaway).
 The performance is suggested to be better, but that is yet to be tested */

  onDeletePost = e => {
    if (window.confirm('Delete this post?')) {
      this.props.deletePost(e.target.dataset.id, () => {}) //no redirect
    }
  }
  onDelIconHover = e => this.props.delIconHover(e.target.dataset.id)

  onDelIconLeave = e => this.props.delIconLeave(e.target.dataset.id)

  onSelectStart = e => this.props.selectStart(e.target.dataset.id)

  onHover = e => this.props.hover(e.target.dataset.id)

  renderItems() {
    const items = _.map(this.props.posts, post => {
      const p = this.props.deleteMode
      const className =
        post.id in p.selectionList
          ? 'List-group-item Selected'
          : post.id in p.delIconHovered
            ? 'List-group-item DelHovered'
            : 'List-group-item'

      const postItem = p.deleteModeActive ? (
        <li
          className={className}
          key={post.id}
          data-id={post.id}
          onMouseDown={this.onSelectStart}
          onMouseEnter={this.onHover}>
          <div className="Title nonselect" data-id={post.id}>
            {post.title}
          </div>
        </li>
      ) : (
        <li className={className} key={post.title}>
          <div className="Title">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </div>
          <img
            data-id={post.id}
            onClick={this.onDeletePost}
            onMouseEnter={this.onDelIconHover}
            onMouseLeave={this.onDelIconLeave}
            src="https://cdn3.iconfinder.com/data/icons/gray-toolbar-4/512/dustbin-512.png"
            alt="del"
          />
          {/* images better be local in production */}
        </li>
      )
      return postItem
    })
    return items
  }

  render() {
    const { selectFinish } = this.props
    return (
      <ul
        onMouseUp={selectFinish}
        onMouseLeave={selectFinish}
        className="List-group">
        {this.renderItems()}
      </ul>
    )
  }
}

const mapStateToProps = ({ deleteMode }) => ({ deleteMode })
export default connect(mapStateToProps, {
  deletePost,
  delIconHover,
  delIconLeave,
  fetchPosts,
  selectStart,
  selectFinish,
  hover
})(PostsWithDelMode)
