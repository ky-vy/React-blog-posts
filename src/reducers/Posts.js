import {
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  DEL_LIST_SUBMITTED
} from '../actions/Fetch'

import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload)

    case DEL_LIST_SUBMITTED:
      const keys = _.map(action.payload, id => id)
      return _.omit(state, keys)

    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data }

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')

    default:
      return state
  }
}
