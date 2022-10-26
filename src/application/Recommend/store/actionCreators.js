import { fromJS } from 'immutable'

import * as actionTypes from './constants'

import { getBannerRequest, getRecommendListRequest } from '../../../api'

export const changeBannerList = payload => ({
  type: actionTypes.CHANGE_BANNER,
  payload: fromJS(payload),
})

export const changeRecommendList = payload => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
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

export const getRecommendList = () => {
  return async dispatch => {
    try {
      const data = await getRecommendListRequest()
      dispatch(changeRecommendList(data.result))
    } catch (err) {
      console.error('推荐歌单数据传输错误: ', err)
    }
  }
}
