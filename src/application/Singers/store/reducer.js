import { fromJS } from 'immutable'

import * as actionTypes from './constants'

const initialState = fromJS({
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.payload)

    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.payload)

    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.payload)

    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.payload)

    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.payload)

    default:
      return state
  }
}

export default reducer
