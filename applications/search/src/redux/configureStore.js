import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { apiMiddleware } from 'redux-api-middleware';

import { config } from '../config';
import { rootReducer } from './rootReducer';

function selectCompose() {
  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export function configureStore() {
  const middlewares = [thunk, apiMiddleware];
  if (config.reduxLog) {
    middlewares.push(createLogger());
  }

  const selectedCompose = selectCompose();

  const enhancer = selectedCompose(
    applyMiddleware(...middlewares),
    persistState([/* 'featureToggle', */ 'settings'], { key: 'redux' })
  );

  const store = createStore(rootReducer, /* preloadedState, */ enhancer);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      /* eslint-disable global-require */
      store.replaceReducer(require('./rootReducer').rootReducer);
    });
  }

  return store;
}
