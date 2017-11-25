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

  onDelModeActivate = () => this.props.delModeActivate()

  onDelSelectAll = () => this.props.delSelectAll(this.props.posts)

  onSelectNone = () => this.props.delSelectClear()

  onDelCancel = () => this.props.delCancel()

  onDelSubmit = () => this.props.deleteListSubmit()

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
      <button className="btnSelectNone" onClick={this.onSelectNone}>
        All selected
      </button>
    ) : (
      <button className="btn" onClick={this.onDelSelectAll}>
        Select all
      </button>
    )

  renderPanelButtons() {
    const { deleteModeActive } = this.props.deleteMode

    return deleteModeActive ? (
      <div className="DeleteButtons">
        <button className="btn" onClick={this.onDelCancel}>
          Cancel
        </button>
        {this.renderQuickSelectButton()}
        <button className="btn" onClick={this.onDelSubmit}>
          Delete
        </button>
      </div>
    ) : (
      <div className="Manage">
        <button className="btn" onClick={this.onDelModeActivate}>
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
