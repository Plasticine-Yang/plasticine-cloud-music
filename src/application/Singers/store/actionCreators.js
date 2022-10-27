import { fromJS } from 'immutable'
import { getHotSingerListRequest, getSingerListRequest } from '../../../api'

import * as actionTypes from './constants'

// ============== 歌手 ==============
export const changeSingerList = payload => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  payload: fromJS(payload),
})

/** @description 获取第一页热门歌手 */
export const getInitialHotSingerList = () => {
  return dispatch => {
    getHotSingerListRequest(0)
      .then(res => {
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
      })
      .catch(err => {
        console.error('获取第一页热门歌手错误: ', err)
      })
  }
}

/** @description 加载更多热门歌手 */
export const loadMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()

    const offset = pageCount * 30

    getHotSingerListRequest(offset)
      .then(res => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
      })
      .catch(err => {
        console.error('加载更多热门歌手错误: ', err)
      })
  }
}

/** @description 获取第一页歌手列表 -- 根据类别和歌手姓名拼音首字母进行筛选 */
export const getInitialSingerList = (category, alpha) => {
  return dispatch => {
    getSingerListRequest(category, alpha, 0)
      .then(res => {
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
      })
      .catch(err => {
        console.error('获取第一页歌手列表错误: ', err)
      })
  }
}

/** @description 加载更多歌手 -- 根据类别和歌手姓名拼音首字母进行筛选 */
export const loadMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList'])

    const offset = pageCount * 30

    getSingerListRequest(category, alpha, offset)
      .then(res => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
      })
      .catch(err => {
        console.error('加载更多歌手错误: ', err)
      })
  }
}

// ============== 加载动画 ==============
export const changeEnterLoading = payload => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})

// ============== 上拉加载 ==============
export const changePullUpLoading = payload => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  payload,
})

// ============== 下拉加载 ==============
export const changePullDownLoading = payload => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  payload,
})

// ============== 分页数 ==============
export const changePageCount = payload => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  payload,
})
