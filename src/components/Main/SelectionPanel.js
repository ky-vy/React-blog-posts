import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as delModeActions from '../../actions/SelectionMode'
import { selectionListSubmit } from '../../actions/Fetch'

import '../../styles/SelectionPanel.css'

class DeleteMode extends Component {
  componentDidMount() {
    this.props.selModeDeactivate()
  }

  onSelectAll = () => this.props.selectAll(this.props.posts)
  //event handler for function with parameter - to prevent new function creation everytime component renders

  selectedAll = () => {
    const { selectionList } = this.props.deleteMode
    const list = {}
    _.map(this.props.posts, post => {
      return (list[post.id] = post.id)
    })
    return JSON.stringify(selectionList) === JSON.stringify(list)
    // JSON.stringify to make objects comparable
  }

  renderQuickSelectButton = () =>
    this.selectedAll() ? (
      <button className="btnSelectNone" onClick={this.props.selectNone}>
        All selected
      </button>
    ) : (
      <button className="btn" onClick={this.onSelectAll}>
        Select all
      </button>
    )

  renderPanelButtons() {
    const { deleteMode: { deleteModeActive } } = this.props
    const {
      selModeActivate,
      selModeDeactivate,
      selectionListSubmit
    } = this.props

    return deleteModeActive ? (
      <div className="DeleteButtons">
        <button className="btn" onClick={selModeDeactivate}>
          Cancel
        </button>
        {this.renderQuickSelectButton()}
        <button className="btn" onClick={selectionListSubmit}>
          Delete
        </button>
      </div>
    ) : (
      <div className="Manage">
        <button className="btn" onClick={selModeActivate}>
          Manage
        </button>
      </div>
    )
  }

  renderPanelHeader() {
    const { deleteModeActive, selectionList } = this.props.deleteMode
    const counter = () => {
      const number = Object.keys(selectionList).length
      return this.selectedAll()
        ? 'All items selected'
        : number > 1 ? `${number} items selected` : `${number} item selected`
    }
    return (
      <div className="PanelHeader">
        {!deleteModeActive ? (
          <h2>{this.props.label}</h2>
        ) : _.isEmpty(selectionList) ? (
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
  selectionListSubmit
})(DeleteMode)
