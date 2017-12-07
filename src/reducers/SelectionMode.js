import { DEL_LIST_SUBMITTED } from '../actions/Fetch'
import {
  ACTIVATED,
  SELECT_STARTED_CHECK,
  SELECT_STARTED_UNCHECK,
  SELECT_HOVERED,
  SELECT_FINISHED,
  SELECTED_ALL,
  SELECTED_NONE,
  CANCELED,
  DEL_ICON_HOVERED,
  DEL_ICON_UNHOVERED
} from '../actions/SelectionMode'

import _ from 'lodash'

export default (
  state = {
    deleteModeActive: false,
    mouseDown: false,
    markAsSelected: true,
    selectionList: {},
    delIconHovered: {}
  },
  action
) => {
  const id = action.payload
  const selectionList_select = { ...state.selectionList, [id]: Number(id) }
  const selectionList_deselect = _.omit(state.selectionList, id)

  switch (action.type) {
    case DEL_ICON_HOVERED:
      return { ...state, delIconHovered: { [id]: id } }

    case DEL_ICON_UNHOVERED:
      return { ...state, delIconHovered: {} }

    case ACTIVATED:
      return { ...state, deleteModeActive: true }

    case CANCELED:
      return {
        ...state,
        deleteModeActive: false,
        selectionList: {}
      }

    case SELECTED_ALL:
      const selectionList_all = {}
      _.map(action.payload, post => {
        return (selectionList_all[post.id] = post.id)
      })

      return { ...state, selectionList: selectionList_all }

    case SELECTED_NONE:
      return { ...state, selectionList: {} }

    case DEL_LIST_SUBMITTED:
      return {
        ...state,
        deleteModeActive: false,
        selectionList: {}
      }

    case SELECT_STARTED_CHECK:
      return {
        ...state,
        selectionList: selectionList_select,
        markAsSelected: true,
        mouseDown: true
      }

    case SELECT_STARTED_UNCHECK:
      return {
        ...state,
        selectionList: selectionList_deselect,
        markAsSelected: false,
        mouseDown: true
      }

    case SELECT_HOVERED:
      return state.markAsSelected
        ? { ...state, selectionList: selectionList_select }
        : { ...state, selectionList: selectionList_deselect }

    case SELECT_FINISHED:
      return { ...state, mouseDown: false }

    default:
      return state
  }
}
