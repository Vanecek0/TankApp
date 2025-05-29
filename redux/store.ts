import { configureStore } from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import tankingReducer from './reducers/tankingReducer';


const rootReducer = combineReducers({})

const store = {}; /*configureStore({ 
  reducer: {},
});*/


/*export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;*/

export default store;