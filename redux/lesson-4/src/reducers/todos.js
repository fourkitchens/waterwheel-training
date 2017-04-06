import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, LIKE_TODO, UNLIKE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        { ...action.todo },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case LIKE_TODO:
      return state.map(todo =>
        todo.id === action.todoId ?
          { ...todo, userLiked: action.userLiked, likes: [...todo.likes, { id: action.id, userId: action.userLiked }]  } :
          todo
      )

    case UNLIKE_TODO:
      return state.map(todo => {
        const likeIndex = todo.likes.findIndex(like => like.id === action.id)
        return todo.id === action.todoId ?
          { ...todo, userLiked: '', likes: todo.likes.slice(0,likeIndex).concat(todo.likes.slice(likeIndex+1)) } :
          todo
      })

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
