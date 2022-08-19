import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from './reducers/counter';
import detailReducer from './reducers/details';
export default configureStore(
  {
    reducer: {
      counter: counterReducer,
      details: detailReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  }
);
