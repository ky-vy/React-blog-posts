import _ from 'lodash'
import axios from 'axios' //for easy HTTP requests
import Q from 'q' /* for complex promises */

export const FETCH_POSTS = 'fetch_posts'
export const FETCH_POST = 'fetch_post'
export const CREATE_POST = 'create_post'
export const DELETE_POST = 'delete_post'
export const DEL_LIST_SUBMITTED = 'del_list_submitted'

const ROOT_URL = 'https://reduxblog.herokuapp.com/api/posts'
const API_KEY = '?key=huizilla-firewolf'

export const fetchPosts = () => {
  const request = axios.get(ROOT_URL + API_KEY)
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export const createPost = (values, callback) => {
  const request = axios.post(ROOT_URL + API_KEY, values).then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }
}

export const fetchPost = id => {
  const request = axios.get(ROOT_URL + '/' + id + API_KEY)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export const deletePost = (id, callback) => {
  const request = axios //Promise Middlewear catches this request automatically
    .delete(ROOT_URL + '/' + id + API_KEY)
    .then(() => callback())

  return {
    type: DELETE_POST,
    payload: id
  }
}

//the API used in this project for requests doesn't provide the "delete all"
//request, so have to use a single "delete" request many times(2 requests/second)

//With the "delete all" request this complex function wouldn't be needed, but it
//can be considered as an example of dealing with complex asynchronus functions.
export const deleteListSubmit = () => {
  return (dispatch, getState) => {
    const posts = getState().deleteMode.deleteList

    function request(id, timeout, times) {
      return axios.delete(ROOT_URL + '/' + id + API_KEY).then(
        answer => {
          return answer
        },
        error => {
          if (times === 0) throw new Error('error, duh')
          return Q.delay(timeout).then(() => {
            return request(id, timeout, times - 1)
          })
        }
      )
    }

    const deleteLoop = new Promise(resolve => {
      const promises = []
      _.map(posts, id => {
        promises.push(
          new Promise(resolve => {
            return request(id, 1000, 5).then(resolve())
          })
        )
      })
      return promises
        .reduce(Q.when, Q()) //Promise.ALL, but sequential
        .then(console.log('resolve'))
        .then(resolve())
    })

    //fix later: dispatches even when deleteLoop not finished
    deleteLoop.then(() => {
      dispatch({
        type: DEL_LIST_SUBMITTED,
        payload: posts
      })
    })
  }
}
