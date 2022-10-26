import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.payload)

    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.payload)

    default:
      return state
  }
}

export default reducer
