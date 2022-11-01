import { fromJS } from 'immutable'

import * as actionTypes from './constants'

const initialState = fromJS({
  rankList: [],
  loading: true,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      return state.set('rankList', action.payload)

    case actionTypes.CHANGE_LOADING:
      return state.set('loading', action.payload)

    default:
      return state
  }
}

export default reducer
