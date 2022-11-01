import { combineReducers } from 'redux-immutable'

import { rankReducer } from '../application/Rank/store'
import { recommendReducer } from '../application/Recommend/store'
import { singersReducer } from '../application/Singers/store'

const reducer = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
})

export default reducer
