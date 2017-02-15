import * as types from '../constants/ActionTypes'
import normalizeData from '../lib/normalizeData'
import Promise from 'bluebird'

export const addTodo = text => (dispatch, getState) => {
  return window.waterwheel.jsonapi.post('node/todo', {
    data: { 'attributes': { 'title': text } }
  })
  .then(res => {
    dispatch({ type: types.ADD_TODO, todo: normalizeData(res.data) })
  })
}

export const deleteTodo = id => (dispatch, getState) => {
  return window.waterwheel.jsonapi.delete('node/todo', id)
  .then(res => {
    dispatch ({ type: types.DELETE_TODO, id })
  })
}

export const editTodo = (id, text) => (dispatch, getState) => {
  return window.waterwheel.jsonapi.patch(`node/todo/${id}`, {
    data: {
      id,
      'attributes': { 'title': text },    
    }
  })
  .then(res => {
    const { id, text } = normalizeData(res.data)
    dispatch({ type: types.EDIT_TODO, id, text })
  })
}

export const completeTodo = (id, text) => (dispatch, getState) => {
  const completeToggle = getState().todos.filter((todo) => todo.id === id)[0].completed
  return window.waterwheel.jsonapi.patch(`node/todo/${id}`, {
    data: {
      id,
      'attributes': { 'field_completed': Number(!completeToggle) },    
    }
  })
  .then(res => {
    dispatch({ type: types.COMPLETE_TODO, id })
  })
}

export const completeAll = () => (dispatch, getState) => {
  const areAllComplete = getState().todos.every(todo => todo.completed)
  const todos = getState().todos.filter(todo => areAllComplete || !todo.completed)

  return Promise.map(todos, ({id, completed}) => (
      window.waterwheel.jsonapi.patch(`node/todo/${id}`, {
        data: {
          id,
          'attributes': { 'field_completed': Number(!completed) },
        }
      })
    ), { concurrency: 2 })
  .then(res => {
    dispatch({ type: types.COMPLETE_ALL })
  })
}

export const clearCompleted = () => (dispatch, getState) => {
  const todos = getState().todos.filter(todo => todo.completed)

  return Promise.map(todos, ({id}) => (
      window.waterwheel.jsonapi.delete(`node/todo`, id)
    ), { concurrency: 2 })
  .then(res => {
    dispatch({ type: types.CLEAR_COMPLETED })
  })
}

export const likeTodo = (id) => (dispatch, getState) => {
  const todo = getState().todos.filter(todo => todo.id === id)[0]
  const like = todo.likes.find(like => like.userId === todo.userLiked)
  if (!todo.userLiked) {
    return window.waterwheel.jsonapi.post('node/likes', {
      data: {
        attributes: { title: `Like for ${todo.id}` },
        relationships: { field_todo: { data: { id, type: 'node--todo' } } }
      }
    })
    .then(res => dispatch({ type: types.LIKE_TODO, todoId: todo.id, id: res.data.id, userLiked: res.data.relationships.uid.data.id }))
  } else {
    return window.waterwheel.jsonapi.delete('node/likes', like.id)
    .then(res => dispatch({ type: types.UNLIKE_TODO, todoId: id, id: like.id }))
  }
}