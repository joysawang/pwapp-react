import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { configureHistory } from './config/history';
import AppRoute from './config/routes';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: []
}

const history = configureHistory();
const middlewares = [routerMiddleware(history), thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
const store = createStore(persistedReducer, enhancer);
const persistore = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <ConnectedRouter history={history}>
            <AppRoute />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
