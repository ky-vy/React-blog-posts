import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as delModeActions from '../../actions/SelectionMode'
import { deleteListSubmit } from '../../actions/Fetch'

import '../../styles/SelectionPanel.css'

class DeleteMode extends Component {
  componentDidMount() {
    this.props.delCancel()
  }

  onDelSelectAll = () => this.props.delSelectAll(this.props.posts)
  //event handler for function with parameter not to create a new function every time in render

  selectedAll = () => {
    const { deleteList } = this.props.deleteMode
    const list = {}
    _.map(this.props.posts, post => {
      return (list[post.id] = post.id)
    })
    return JSON.stringify(deleteList) === JSON.stringify(list)
    // JSON.stringify to make objects comparable
  }

  renderQuickSelectButton = () =>
    this.selectedAll() ? (
      <button className="btnSelectNone" onClick={this.props.delSelectClear}>
        All selected
      </button>
    ) : (
      <button className="btn" onClick={this.onDelSelectAll}>
        Select all
      </button>
    )

  renderPanelButtons() {
    const { deleteMode: { deleteModeActive } } = this.props
    const { delModeActivate, delCancel, deleteListSubmit } = this.props

    return deleteModeActive ? (
      <div className="DeleteButtons">
        <button className="btn" onClick={delCancel}>
          Cancel
        </button>
        {this.renderQuickSelectButton()}
        <button className="btn" onClick={deleteListSubmit}>
          Delete
        </button>
      </div>
    ) : (
      <div className="Manage">
        <button className="btn" onClick={delModeActivate}>
          Manage
        </button>
      </div>
    )
  }

  renderPanelHeader() {
    const { deleteModeActive, deleteList } = this.props.deleteMode
    const counter = () => {
      const number = Object.keys(deleteList).length
      return this.selectedAll()
        ? 'All items selected'
        : number > 1 ? `${number} items selected` : `${number} item selected`
    }
    return (
      <div className="PanelHeader">
        {!deleteModeActive ? (
          <h2>{this.props.label}</h2>
        ) : _.isEmpty(deleteList) ? (
          <h3>Click or drag to select items</h3>
        ) : (
          <h3>{counter()}</h3>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="TopPanel">
        {this.renderPanelHeader()}
        {this.renderPanelButtons()}
      </div>
    )
  }
}

const mapStateToProps = ({ deleteMode }) => ({ deleteMode })
export default connect(mapStateToProps, {
  ...delModeActions,
  deleteListSubmit
})(DeleteMode)
