import counterReducer from './reducers/counterReducer'
import { configureStore } from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import tankingReducer from './reducers/tankingReducer';


const rootReducer = combineReducers({
  count: counterReducer,
  tanking: tankingReducer
})

const store = configureStore({
  reducer: {
    count: counterReducer,
    tanking: tankingReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;