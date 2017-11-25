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
    deleteList: {},
    delIconHovered: {}
  },
  action
) => {
  const id = action.payload
  const deleteList_select = { ...state.deleteList, [id]: Number(id) }
  const deleteList_deselect = _.omit(state.deleteList, id)

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
        deleteList: {}
      }

    case SELECTED_ALL:
      const deleteList_all = {}
      _.map(action.payload, post => {
        return (deleteList_all[post.id] = post.id)
      })

      return { ...state, deleteList: deleteList_all }

    case SELECTED_NONE:
      return { ...state, deleteList: {} }

    case DEL_LIST_SUBMITTED:
      return {
        ...state,
        deleteModeActive: false,
        deleteList: {}
      }

    case SELECT_STARTED_CHECK:
      return {
        ...state,
        deleteList: deleteList_select,
        markAsSelected: true,
        mouseDown: true
      }

    case SELECT_STARTED_UNCHECK:
      return {
        ...state,
        deleteList: deleteList_deselect,
        markAsSelected: false,
        mouseDown: true
      }

    case SELECT_HOVERED:
      return state.markAsSelected
        ? { ...state, deleteList: deleteList_select }
        : { ...state, deleteList: deleteList_deselect }

    case SELECT_FINISHED:
      return { ...state, mouseDown: false }

    default:
      return state
  }
}
