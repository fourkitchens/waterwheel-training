# Lesson 2
## Lesson 2.1 - Start counting locally (non-persistent)
1. _(In [TodoItem.js](src/components/TodoItem.js))_ Add a function next to `handleDoubleClick` that called `handleLikeTodo`.
```jsx
handleLikeTodo = () => {}
```
2. In `handleLikeTodo`, use `setState` to increment the number of likes by `1`.
```jsx
this.setState((prevState, props) => ({ numLikes: prevState.numLikes + 1 }))
```
3. We need clicking the like button to run `handleLikeTodo`. To do that, we need to pass it to our `LikeButton` which has the button that will be clicked. _(In [TodoItem.js](src/components/TodoItem.js))_ Add a `handleClick` prop to the `LikeButton` element and pass the `handleLikeTodo` function as the value.
```jsx
<LikeButton numLikes={this.state.numLikes}
            handleClick={this.handleLikeTodo}
            id={todo.id} />
```
4. _(In [LikeButton.js](src/components/LikeButton.js))_ Add the `handleClick` click prop to the function parameter.
```jsx
const LikeButton = ({ numLikes, id, handleClick }) =>
```
5. Also, add `handleClick` to the `propTypes`.
```jsx
LikeButton.propTypes = {
  numLikes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}
```
6. Add an `onClick` to the button and pass it the `handleClick` function we received as a prop.
```jsx
<button className="likeTodo" onClick={handleClick}>👍</button>
```
7. Save the file, open the browser and try it out. Clicking the like button should increment the number of likes. If this isn’t working for you open up the dev console.

## Stretch Goals:
* 🥈 SILVER: Every time the like button is clicked, change the emoji.

## Lesson 2.2 - Make the Like button rotate emojis every second
_Use [TodoItem.js](src/components/TodoItem.js) as an example if you don’t remember how to do some of this._

1. _(In [LikeButton.js](src/components/LikeButton.js))_ Convert the `LikeButton` function into a `class` that extends `Component`. Make sure you remove your old exports at the bottom of the file.
```jsx
export default class LikeButton extends Component {}
```
2. Convert the `propTypes` object to a `static` class object just like in [TodoItem.js](src/components/TodoItem.js).
```jsx
static propTypes = {
  numLikes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}
```
3. Create a `render` function that returns the JSX. Make sure to either destructure `this.props` at the top of this function or use them like `this.props.numLikes`.
4. Save the file and check out the browser. It should work like it did before.
5. Add a constant named THUMBS at the top of your file. If your computer cannot handle different color emojis then use a variety of supported emojis instead.
```jsx
const THUMBS = ['👍🏽','👍🏾','👍🏿','👍','👍🏻','👍🏼']
```
6. Create a class property called state. This will represent our initial state. In that property create have thumbsUp default to an emoji.
```jsx
state = {
  thumbsUp: THUMBS[0]
}
```
7. In order to start a timer when the component is mounted we need to create a componentDidMount function. In this function, set an interval on this that sets the state of thumbsUp to the next Thumb in the THUMBS array. We know the interval is every second. There are 6 emojis in the thumbsUp array. What we if we used the current second in time in coordination with the number of thumbsUp values we have? We can use the modulo operator `%` to do something like:
```jsx
componentDidMount() {
  // Every second, get a value from the array of thumbs an set the state.
  this.timerId = setInterval(() => {
    this.setState((prevState) => ({
      thumbsUp: THUMBS[new Date().getSeconds() % THUMBS.length]
    }))
  }, 1000);
}
```
8. We don’t want the timer running if the Todo is deleted. Clear the interval when the component unmounts
```jsx
componentWillUnmount() {
  clearInterval(this.timerId)
}
```
9. Now we need to change the like button text to use the thumbsUp state.
```jsx
<button className="likeTodo" onClick={handleClick}>{this.state.thumbsUp}</button>
```
10. Save file and check out your browser.

## Atom Editor Plugins:
- js-hyperclick 
- language-JSX
- language-babel
- react-snippets
