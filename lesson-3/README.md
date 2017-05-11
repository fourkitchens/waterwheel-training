# Lesson 3
## Lesson 3.1 - What does Waterwheel do for us?
1. First we’ll use the native JS fetch function.
```jsx
fetch('https://waterwheel.4kclass.com/jsonapi/node/todo?_format=api_json').then((response) => response.json()).then(console.log).catch(console.log)
```
2. 403? What is the problem here?
  - https://github.com/acquia/waterwheel.js/blob/master/lib/helpers/request.js#L38
  - https://github.com/acquia/waterwheel.js/blob/master/lib/helpers/oauth.js#L15
3. Waterwheel makes the output simpler and does all the Oauth stuff for us. 💯
4. Waterwheel’s JSON-API provides a number of ways to filter and sort the data that is returned.
```jsx
window.waterwheel.jsonapi.get('node/todo', { filter: {
  myFilter: {
    condition: {
      value: '1',
      path: 'field_completed'
    }
  }
}, sort: 'changed' }).then(console.log).catch(console.log)
```
5. Waterwheel also has tools for [getting information about content types](https://github.com/acquia/waterwheel.js#get-field-metadata-for-an-entitybundle).

## Lesson 3.2 - Hooking up our likes to Drupal
1. _(In [public/index.html](public/index.html))_ Notice how waterwheel is being added. Webpack will replace `%PUBLIC_URL%` for us. This will attach `waterwheel` to the `window` object. When doing this, make sure to add this script above anything that depends on waterwheel. In our case, webpack is inserting our JavaScript bundle below the waterwheel script tag.
2. _(In [TodoItem.js](src/components/TodoItem.js))_ Change `numLikes` in the initial state to be called `likes` and have an initial value of an empty array.
```jsx
state = {
  likes: [],
  editing: false
}
```
3. Change the `handleLikeTodo` function into a Waterwheel `POST` that creates a new like node.
  - We need to set a `title` since that’s required by Drupal. Set something relatively useful.
  - Most importantly we need to create the relationships from the like node to the todo node. This is how we keep track of which like goes where. We use the `field_todo` field in the relationships property to do that and send the `todo.id` and type `node--todo`.
```jsx
handleLikeTodo = () => {
  const { todo } = this.props;
  return window.waterwheel.jsonapi.post('node/likes', {
    data: {
      attributes: { title: `Like for ${todo.id}` },
      relationships: { field_todo: { data: { id: todo.id, type: 'node--todo' } } }
    }
  })
}
```
4. This is not enough though, we need to update our `TodoItem` state to reflect the like we just added. Let’s create an `addLike` function that updates the `likes` array in `state`. Pass the `id` to that function. We’ll make the `likes` is an array of objects that contain the `like` `id` to make a future lesson easier. Use the spread operator on `prevState.likes` to create a new array with the new like object.
```jsx
addLike = (id) => {
  this.setState((prevState, props) => ({ likes: [...prevState.likes, { id }] }))
}
```
5. Now we need to call our `addLike` function once the Promise returned by Waterwheel has resolved. Pass the new like’s `id` to the function.
```jsx
.then(res => this.addLike(res.data.id))
```
6. Finally, since we’re not storing `numLikes` anymore, pass `this.state.likes.length` into the `numLikes` prop for the `LikeButton` element.
```jsx
<LikeButton numLikes={this.state.likes.length}
  handleClick={this.handleLikeTodo}
  id={todo.id} />
```
7. Save your files and open your browser with the network tab open. You should see likes being POSTed to the server.

## Lesson 3.3 - Fetch initial likes from Drupal
1. Remember what we learned about lifting state? We need to use that to store the likes in the appropriate component. The `MainSection` component is good place for it since it is responsible for creating the each `TodoItem` element.
2. _(In [TodoItem.js](src/components/TodoItem.js))_  Let’s add a prop to `propTypes` named `likes` of type `array`. Don’t make it required.
```
likes: PropTypes.array,
```
3. Since some todos won’t have any likes, lets default the prop to an empty array. Use the static class property `defaultProps` to set this.
```jsx
static defaultProps = {
  likes: []
}
```
4. Remember `componentWillReceiveProps`? It is used in the case that we need to do something with any new props that a component receives. Let’s use it to keep the state of our `likes` array updated with the `likes` we receive from props:
```jsx
componentWillReceiveProps = (nextProps) => {
  if (this.props.likes !== nextProps.likes) {
    this.setState(prevState => ({ likes: nextProps.likes }))
  }
}
```
5. Now we need to sync the props with the state. Always be careful when you find yourself doing this because it can be a sign that you’re duplicating efforts. However, in our case, we need to receive likes as props, set them as the initial state, and update that state whenever a like is added or removed. Because the likes won’t be updated any other way, this isn’t a problem. _(In [TodoItem.js](src/components/TodoItem.js))_ Make the likes initial state be populated with the likes received in props.
```jsx
likes: this.props.likes,
```
6. Save your file and refresh the page. You should still see 0 initial likes for each todo. That means our default works.
7. Now we need to actually fetch the likes and pass them to their respective todo. _(In [MainSection.js](src/components/MainSection.js))_ Add a `likes` property to the initial state defaulting to `{}`. You’ll see why this is an object shortly.
8. Next, we need to add a `componentDidMount` function so that we can fetch the likes and re-render the todos once they’ve arrived. Make the function do a `GET` against all like nodes.
```jsx
componentDidMount = () => {
  window.waterwheel.jsonapi.get('node/likes', {})
    .then(likes => {
      const normalizedLikes = this.normalizeLikes(likes);
      this.setState(() => ({ likes: normalizedLikes }))
    })
}
```
9. Notice there is a `normalizeLikes` function being called in the thenable. This function will take the response from the server and keep the data we need, restructuring it to be usable in our component. This function will return an object containing arrays of likes (objects with a id property) hashed by the todo id. That way all the likes for a given id are in the same place. It will take the likes received from the server as a parameter.
```jsx
normalizeLikes = (likes) => {}
```
10. Inside that function, first we need to filter out any `likes` that don’t have a `todo` perchance. This happens when we delete a Todo. We have nothing setup to also delete any likes referencing that todo.
```jsx
const normalizedLikes = {};
likes.data
  .filter(like => like.relationships.field_todo.data)
```
11. Then, for each of the remaining likes, we need to create an `array` hashed by the like's todo id and add a like object to that array.
```jsx
.forEach(like => {
    if (!normalizedLikes[like.relationships.field_todo.data.id]) {
      normalizedLikes[like.relationships.field_todo.data.id] = [];
    }
    // Create an object containing arrays of likes keyed by the todo ID.
    normalizedLikes[like.relationships.field_todo.data.id].push({
      id: like.id,
    })
  });
```
12. Finally, return the normalizedLikes
```
return normalizedLikes;
```
13. This gets this likes into a nice format for passing into to each todo as props.
14. Finally, we need to pass these likes down to the `TodoItem` component. Add `likes` to the destructured statement in the `render` function.
```jsx
const { filter, likes } = this.state
```
15. Then, add a `likes` prop to the `TodoItem` element in which you use the `todo` `id` to pass the appropriate `array` of `likes`.
```jsx
<TodoItem key={todo.id} todo={todo} likes={likes[todo.id]} {...actions} />
```
16. Save your files and check out the browser. You should see initial likes loading. NOTE: If you aren't seeing some of your initial likes/todos, it could be because the JSON API module defaults to a max page size of `50`. A future lesson could be to page through all likes/todos when initially fetching to ensure they're all fetched. For now the first 50 todos/likes will be shown.

## Stretch Goals:
* 🥇 GOLD: Add functionality so that a user can unlike a todo. HINT: The answer is in `lesson-3-answer`.
