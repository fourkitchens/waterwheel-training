export default ({ id, attributes }) => ({
  changed: attributes.changed,
  completed: Boolean(Number(attributes.field_completed)),
  id,
  numLikes: 0,
  text: attributes.title,
})