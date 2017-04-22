export default ({ id, attributes }) => ({
  changed: attributes.changed,
  completed: Boolean(Number(attributes.field_completed)),
  id,
  text: attributes.title,
})