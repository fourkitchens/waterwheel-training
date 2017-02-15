import normalizeData from './normalizeData';
import relate from 'jsonapi-relate';

export default () => {
  return window.waterwheel.jsonapi.get('node/todo', {
    sort: '-changed',
    include: 'uid'
  })
  .then(res => Promise.all([
    res,
    window.waterwheel.jsonapi.get('node/likes', { include: 'uid' }),
  ]))
  .then(res => {
    window.uid = JSON.parse(atob(window.waterwheel.oauth.tokenInformation.access_token.split('.')[1])).sub;
    const todos = res[0];
    const likes = res[1];
    todos.data = Array.isArray(res[0].data) ? res[0].data : Array(res[0].data);
    likes.data = Array.isArray(res[1].data) ? res[1].data : Array(res[1].data);
    todos.data.forEach(todo => {
      todo.attributes.likes = likes.data
        .filter(like => like.relationships.field_todo.data && like.relationships.field_todo.data.id === todo.id)
        .map(like => ({
          id: like.attributes.uuid,
          userId: relate.getRelationship(likes, like, 'uid').attributes.uid,
        }))
        todo.attributes.userId = relate.getRelationship(todos, todo, 'uid').attributes.uid
    })
    delete window.waterwheel.oauth.tokenInformation.password
    window.initialTodos = todos.data.length ? todos.data.map(normalizeData) : [];
  })
}
