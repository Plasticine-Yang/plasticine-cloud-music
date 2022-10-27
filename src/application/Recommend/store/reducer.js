import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const initialState = fromJS({
  bannerList: [],
  recommendList: [],
  // 推荐列表加载时的动画
  enterLoading: true,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.payload)

    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.payload)

    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.payload)

    default:
      return state
  }
}

export default reducer
