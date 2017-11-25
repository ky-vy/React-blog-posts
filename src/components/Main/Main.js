import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostsWithDelMode from './PostsWithSelection'
import SelectionModePanel from './SelectionPanel'
import Header from '../Header'

import { selectFinish } from '../../actions/SelectionMode'

class Main extends Component {
  render() {
    return (
      <div>
        <Header colored={true} button="Add" />
        <div className="container">
          <SelectionModePanel label="Posts" posts={this.props.posts} />
          {/* Selection Mode action buttons. Used together with any
              component that has the Selection Mode.
          pass the same posts as to the component it is used with */}

          <PostsWithDelMode posts={this.props.posts} />
          {/* reusable list component with Selection Mode selection events.
          Pass some posts to render */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(mapStateToProps, { selectFinish })(Main)
