import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api'
import { CHANGE_LOADING, CHANGE_RANK_LIST } from './constants'

// ============== 榜单 ==============
export const changeRankList = payload => ({
  type: CHANGE_RANK_LIST,
  payload: fromJS(payload),
})

export const getRankList = () => {
  return async dispatch => {
    try {
      const data = await getRankListRequest()
      dispatch(changeRankList(data.list))
      dispatch(changeLoading(false))
    } catch (error) {
      console.error('获取榜单列表错误:', error)
    }
  }
}

// ============== 加载动画 ==============
export const changeLoading = payload => ({
  type: CHANGE_LOADING,
  payload,
})
