import { fromJS } from 'immutable'

import * as actionTypes from './constants'

import { getBannerRequest, getRecommendListRequest } from '../../../api'

// ============== 轮播图 ==============
export const changeBannerList = payload => ({
  type: actionTypes.CHANGE_BANNER,
  payload: fromJS(payload),
})

export const getBannerList = () => {
  return async dispatch => {
    try {
      const data = await getBannerRequest()
      dispatch(changeBannerList(data.banners))
    } catch (err) {
      console.error('轮播图数据传输错误: ', err)
    }
  }
}

// ============== 推荐列表 ==============
export const changeRecommendList = payload => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  payload: fromJS(payload),
})

export const getRecommendList = () => {
  return async dispatch => {
    try {
      const data = await getRecommendListRequest()
      dispatch(changeRecommendList(data.result))
      // 数据加载完毕后关闭加载动画
      dispatch(changeEnterLoading(false))
    } catch (err) {
      console.error('推荐歌单数据传输错误: ', err)
    }
  }
}

// ============== 加载动画 ==============
export const changeEnterLoading = payload => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})
