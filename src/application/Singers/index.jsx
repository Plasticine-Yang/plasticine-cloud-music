import React, { useState } from 'react'

import { alphaTypes, categoryTypes } from '../../api'

import HorizontalScroll from '../../base-ui/HorizontalScroll'
import { HorizontalScrollContainer } from '../../base-ui/HorizontalScroll/style'
import Scroll from '../../base-ui/Scroll'

import { List, ListContainer, ListItem } from './style'

import { singersActionCreators } from './store'
import {
  loadMoreHotSingerList,
  loadMoreSingerList,
} from './store/actionCreators'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'

function Singers(props) {
  const { singerList, pullUpLoading, pullDownLoading, pageCount } = props

  const {
    getHotSingerDispatch,
    resetFilterParamsDispatch,
    pullUpLoadMoreDispatch,
    pullDownRefreshDispatch,
  } = props

  const [activeCategoryKey, setActiveCategoryKey] = useState('')
  const [activeAlphaKey, setActiveAlphaKey] = useState('')

  // 组件挂载后默认加载热门歌手列表
  useState(() => {
    getHotSingerDispatch()
  }, [])

  const handleChangeCategoryKey = categoryKey => {
    setActiveCategoryKey(categoryKey)
    resetFilterParamsDispatch(categoryKey, activeAlphaKey)
  }

  const handleChangeAlphaKey = alphaKey => {
    setActiveAlphaKey(alphaKey)
    resetFilterParamsDispatch(activeCategoryKey, alphaKey)
  }

  const handlePullUp = () => {
    pullUpLoadMoreDispatch(
      activeCategoryKey,
      activeAlphaKey,
      activeCategoryKey === '',
      pageCount,
    )
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(activeCategoryKey, activeAlphaKey)
  }

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : []
    return (
      <List>
        {list.map(item => {
          return (
            <ListItem key={item.id}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <>
      {/* 顶部分类滚动列表 */}
      <HorizontalScrollContainer>
        {/* 歌手分类 */}
        <HorizontalScroll
          list={categoryTypes}
          label={'分类(默认热门):'}
          activeItemKey={activeCategoryKey}
          onItemClick={categoryKey => handleChangeCategoryKey(categoryKey)}
        />

        {/* 首字母 */}
        <HorizontalScroll
          list={alphaTypes}
          label={'首字母'}
          activeItemKey={activeAlphaKey}
          onItemClick={alphaKey => handleChangeAlphaKey(alphaKey)}
        />
      </HorizontalScrollContainer>

      {/* 底部歌手列表 */}
      <ListContainer>
        <Scroll
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
          onPullUp={handlePullUp}
          onPullDown={handlePullDown}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </>
  )
}

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})

const mapDispatchToProps = dispatch => ({
  getHotSingerDispatch() {
    dispatch(singersActionCreators.getInitialHotSingerList())
  },

  /** @description 上拉加载更多 */
  pullUpLoadMoreDispatch(category, alpha, hot, count) {
    dispatch(singersActionCreators.changePullUpLoading(true))
    dispatch(singersActionCreators.changePageCount(count + 1))

    if (hot) {
      dispatch(loadMoreHotSingerList())
    } else {
      dispatch(loadMoreSingerList(category, alpha))
    }
  },

  /** @description 顶部下拉刷新数据 */
  pullDownRefreshDispatch(category, alpha) {
    dispatch(singersActionCreators.changePullDownLoading(true))
    dispatch(singersActionCreators.changePageCount(0))

    if (category === '' && alpha === '') {
      dispatch(singersActionCreators.getInitialHotSingerList())
    } else {
      dispatch(singersActionCreators.getInitialSingerList(category, alpha))
    }
  },

  /** @description 改变歌手分类或歌手姓名拼音首字母  */
  resetFilterParamsDispatch(category, alpha) {
    dispatch(singersActionCreators.changePageCount(0))
    dispatch(singersActionCreators.changeEnterLoading(true))
    dispatch(singersActionCreators.getInitialSingerList(category, alpha))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
