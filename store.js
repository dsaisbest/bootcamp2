import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import detailReducer from './reducers/details'
export default  configureStore({
  reducer: {
    counter: counterReducer,
    details:detailReducer
  },
})