import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [reduxThunk];

if (process.env.REACT_APP_ENV === 'localhost') {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  {
    user: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(...middlewares));

export const persistor = persistStore(store);
