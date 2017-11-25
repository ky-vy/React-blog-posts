import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import PostsReducer from './Posts'
import DeleteModeReducer from './SelectionMode'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer, //comes from ReduxForm - has its own actions and reducers.
  deleteMode: DeleteModeReducer
})

export default rootReducer
