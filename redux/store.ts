import counterReducer from './reducers/counterReducer'
import {combineReducers, legacy_createStore as createStore} from 'redux'

const rootReducer = combineReducers({
  count: counterReducer
})

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store