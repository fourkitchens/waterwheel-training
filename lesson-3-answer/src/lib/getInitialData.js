import normalizeData from './normalizeData';
import relate from 'jsonapi-relate';

export default () => {
  return window.waterwheel.jsonapi.get('node/todo', {
    sort: '-changed',
    include: 'uid'
  })
  .then(res => {
    window.uid = JSON.parse(atob(window.waterwheel.oauth.tokenInformation.access_token.split('.')[1])).sub;
    res.data = Array.isArray(res.data) ? res.data : Array(res.data)
    res.data.forEach(todo => {
        todo.attributes.userId = relate.getRelationship(res, todo, 'uid').attributes.uid
    })
    window.initialTodos = res.data.length ? res.data.map(normalizeData) : []
  })
}