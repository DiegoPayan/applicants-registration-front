import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '.';
import { routerMiddleware } from 'connected-react-router';
import promise from 'redux-promise';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const configureStore = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      promise, thunk
    ),
  ))


export default configureStore;