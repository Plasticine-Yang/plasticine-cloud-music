import { reducer as recommendReducer } from '../application/Recommend/store'

import { combineReducers } from 'redux-immutable'

const reducer = combineReducers({
  recommend: recommendReducer,
})

export default reducer
