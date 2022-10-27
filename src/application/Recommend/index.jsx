import React, { useEffect } from 'react'

import Scroll from '../../base-ui/Scroll'
import Loading from '../../base-ui/Loading'

import Slider from '../../components/Slider'

import RecommendList from './components/RecommendList'
import { RecommendContainer } from './style'

import { connect } from 'react-redux'
import { recommendActionCreators } from './store'

import { forceCheck } from 'react-lazyload'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }

    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <RecommendContainer>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>

      {/* 加载动画 */}
      {enterLoading ? <Loading /> : null}
    </RecommendContainer>
  )
}

// 连接 redux 到 react 中
const mapStateToProps = state => {
  return {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
  }
}

const mapDispatchToProps = dispatch => ({
  getBannerDataDispatch() {
    dispatch(recommendActionCreators.getBannerList())
  },
  getRecommendListDataDispatch() {
    dispatch(recommendActionCreators.getRecommendList())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Recommend))
