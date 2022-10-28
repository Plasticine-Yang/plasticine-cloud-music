import { fromJS } from 'immutable'
import React, { useReducer } from 'react'

const initialContextState = fromJS({
  activeCategoryKey: '',
  activeAlphaKey: '',
})

/** @description 歌手列表筛选参数上下文 */
const SingerFilterParamsContext = React.createContext(initialContextState)

// action type
const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('activeCategoryKey', action.payload)

    case CHANGE_ALPHA:
      return state.set('activeAlphaKey', action.payload)

    default:
      return state
  }
}

const SingerContext = props => {
  const [
    singerFilterParamsContextState,
    dispatchSingerFilterParamsContextState,
  ] = useReducer(reducer, initialContextState)

  const contextValue = {
    singerFilterParamsContextState,
    dispatchSingerFilterParamsContextState,
  }

  return (
    <SingerFilterParamsContext.Provider value={contextValue}>
      {props.children}
    </SingerFilterParamsContext.Provider>
  )
}

export { SingerFilterParamsContext, CHANGE_CATEGORY, CHANGE_ALPHA }

export default SingerContext
