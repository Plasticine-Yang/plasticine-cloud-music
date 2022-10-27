import { combineReducers } from 'redux-immutable'

import { recommendReducer } from '../application/Recommend/store'
import { singersReducer } from '../application/Singers/store'

const reducer = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
})

export default reducer
