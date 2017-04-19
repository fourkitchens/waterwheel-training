import React, { Component, PropTypes } from 'react'
import relate from 'jsonapi-relate';
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    filter: SHOW_ALL,
    likes: {},
  }

  componentDidMount = () => {
    window.waterwheel.jsonapi.get('node/likes', { include: 'uid' })
      .then(likes => {
        const normalizedLikes = this.normalizeLikes(likes);
        this.setState(() => ({ likes: normalizedLikes }))
      })
  }

  normalizeLikes = (likes) => {
    const normalizedLikes = {};
    likes.data
      .filter(like => like.relationships.field_todo.data)
      .forEach(like => {
        // Build up an object containing arrays of likes keyed by the todo ID.
        if (!normalizedLikes[like.relationships.field_todo.data.id]) {
          normalizedLikes[like.relationships.field_todo.data.id] = [];
        }
        normalizedLikes[like.relationships.field_todo.data.id].push({
          id: like.id,
          userId: relate.getRelationship(likes, like, 'uid').attributes.uid,
        })
      });
    return normalizedLikes;
  }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter, likes } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.sort((prev, next) => prev.changed < next.changed).map(todo =>
            <TodoItem key={todo.id} todo={todo} likes={likes[todo.id]} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
