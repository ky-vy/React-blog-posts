export const ACTIVATED = 'activated'
export const SELECT_STARTED_CHECK = 'select_start_check'
export const SELECT_STARTED_UNCHECK = 'select_start_uncheck'
export const SELECT_HOVERED = 'select_hovered'
export const SELECT_FINISHED = 'select_finished'
export const SELECTED_ALL = 'select_all'
export const SELECTED_NONE = 'select_none'
export const CANCELED = 'canceled'
export const DEL_ICON_HOVERED = 'del_icon_hovered'
export const DEL_ICON_UNHOVERED = 'del_icon_unhovered'

export const delIconHover = id => ({
  type: DEL_ICON_HOVERED,
  payload: id
})

export const delIconLeave = id => ({
  type: DEL_ICON_UNHOVERED,
  payload: id
})

export const delModeActivate = () => ({ type: ACTIVATED })

export const delCancel = () => ({ type: CANCELED })

export const delSelectAll = posts => ({
  type: SELECTED_ALL,
  payload: posts
})

export const delSelectClear = () => {
  return { type: SELECTED_NONE }
}

export const selectStart = id => {
  return (dispatch, getState) => {
    const { deleteList } = getState().deleteMode
    const selected = id in deleteList
    const active = getState().deleteMode.deleteModeActive

    if (active) {
      selected
        ? dispatch({
            type: SELECT_STARTED_UNCHECK,
            payload: id
          })
        : dispatch({
            type: SELECT_STARTED_CHECK,
            payload: id
          })
    }
  }
}

export const hover = id => {
  return (dispatch, getState) => {
    const mouseDown = getState().deleteMode.mouseDown

    if (mouseDown) {
      dispatch({
        type: SELECT_HOVERED,
        payload: id
      })
    }
  }
}

export const selectFinish = () => ({ type: SELECT_FINISHED })
