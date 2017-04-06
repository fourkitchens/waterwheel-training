export default ({ id, attributes }) => {
  // If todo has likes, find one that is for current user, if it exists.
  const userLike = attributes.likes ? attributes.likes.find(like => like.userId === window.uid) : '';
  return {
    changed: attributes.changed,
    completed: Boolean(Number(attributes.field_completed)),
    id,
    likes: attributes.likes || [],
    text: attributes.title,
    userId: attributes.userId,
    userLiked: userLike ? userLike.userId : '',
  }
}
