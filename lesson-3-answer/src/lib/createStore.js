import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers'

export default () => {
  const setup = applyMiddleware(thunkMiddleware)(createStore);
  const devTools = process.env.NODE_ENV !== 'production' ?
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : // eslint-disable-line no-underscore-dangle, max-len
    undefined;
  const store = setup(reducer, { todos: window.initialTodos }, devTools);
  return store;
};