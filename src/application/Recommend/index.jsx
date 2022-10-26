import React, { useEffect } from 'react'
import Scroll from '../../base-ui/Scroll'

import Slider from '../../components/Slider'

import RecommendList from './components/RecommendList'
import { RecommendContainer } from './style'

import { connect } from 'react-redux'
import { actionCreators } from './store'

import { forceCheck } from 'react-lazyload'

function Recommend(props) {
  const { bannerList, recommendList } = props
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
    </RecommendContainer>
  )
}

// 连接 redux 到 react 中
const mapStateToProps = state => {
  return {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
  }
}

const mapDispatchToProps = dispatch => ({
  getBannerDataDispatch() {
    dispatch(actionCreators.getBannerList())
  },
  getRecommendListDataDispatch() {
    dispatch(actionCreators.getRecommendList())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Recommend))
