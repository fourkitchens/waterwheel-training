import normalizeData from './normalizeData';

export default () => {
  return window.waterwheel.jsonapi.get('node/todo', {
    sort: '-changed',
    include: 'uid'
  })
  .then(res => {
    res.data = Array.isArray(res.data) ? res.data : Array(res.data)
    window.initialTodos = res.data.length ? res.data.map(normalizeData) : []
  })
}