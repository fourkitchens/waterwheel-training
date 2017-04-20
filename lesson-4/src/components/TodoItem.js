import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import LikeButton from './LikeButton'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    likes: PropTypes.array,
  }

  static defaultProps = {
    likes: []
  }

  state = {
    userLiked: '',
    likable: true,
    likes: this.props.likes,
    editing: false
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.likes !== nextProps.likes) {
      const userLike = nextProps.likes.find(like => like.userId === window.uid)
      this.setState(prevState => ({ likes: nextProps.likes, userLiked: userLike ? userLike.userId : '' }))
    }
  }

  addLike = (id, userId) => {
    this.setState((prevState, props) => ({ userLiked: userId, likes: [...prevState.likes, { id, userId }], likable: true, }))
  }

  removeLike = (id) => {
    this.setState(prevState => {
      const likeIndex = prevState.likes.findIndex(like => like.id === id)
      return { userLiked: '', likable: true, likes: prevState.likes.slice(0, likeIndex).concat(prevState.likes.slice(likeIndex + 1)) }
    })
  }

  handleLikeTodo = () => {
    // Make todo unlikable while it's already being liked to avoid duplicates.
    this.setState(prevState => ({ likable: false }))
    const { todo } = this.props;
    if (!this.state.userLiked) {
      return window.waterwheel.jsonapi.post('node/likes', {
        data: {
          attributes: { title: `Like for ${todo.id}` },
          relationships: { field_todo: { data: { id: todo.id, type: 'node--todo' } } }
        }
      })
      .then(res => this.addLike(res.data.id, res.data.relationships.uid.data.id))
    } else {
      const like = this.state.likes.find(like => like.userId === this.state.userLiked)
      return window.waterwheel.jsonapi.delete('node/likes', like.id)
      .then(res => this.removeLike(like.id))
    }
  }

  handleDoubleClick = () => {
    this.setState(() => ({ editing: true }))
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState(() => ({ editing: false }))
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <LikeButton numLikes={this.state.likes.length}
                      likable={this.state.likable}
                      handleClick={this.handleLikeTodo}
                      id={todo.id} />
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
