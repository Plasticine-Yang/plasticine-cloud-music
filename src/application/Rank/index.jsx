import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { rankActionCreators } from './store'

import Scroll from '../../base-ui/Scroll'

import { Container, List, ListItem, SongList } from './style'
import Loading from '../../base-ui/Loading'

/** @description 从接口数据中获取到全球榜数据的起始下标 */
const getGlobalRankListStartIdx = rankList =>
  rankList.findIndex(item => item.tracks.length === 0)

function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDispatch } = props

  const rankList = list ? list.toJS() : []

  // 挂载后获取榜单列表
  useEffect(() => {
    getRankListDispatch()
    // eslint-disable-next-line
  }, [])

  // 手动区分出 官方榜单 和 全球榜单
  // 官方榜单的接口数据中有 tracks 字段 全球榜单的 tracks 字段则为空数组
  const globalRankListStartIdx = getGlobalRankListStartIdx(rankList)
  const officialRankList = rankList.slice(0, globalRankListStartIdx)
  const globalRankList = rankList.slice(globalRankListStartIdx)

  /** @description 渲染榜单列表 -- 包括官方榜(纵向) 和 全球榜(宫格) */
  const renderRankList = (list, useFlex) => {
    return (
      <List useFlex={useFlex}>
        {list.map(item => (
          <ListItem key={item.id} tracks={item.tracks}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="" />
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            {renderSongList(item.tracks)}
          </ListItem>
        ))}
      </List>
    )
  }

  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  // 榜单数据加载时隐藏
  const displayStyle = loading ? { display: 'none' } : { display: '' }

  return (
    <Container>
      <Scroll>
        <div>
          {/* 官方榜 */}
          <h1 className="offcial" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialRankList)}

          {/* 全球榜 */}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalRankList, true)}

          {loading ? <Loading /> : null}
        </div>
      </Scroll>
    </Container>
  )
}

const mapStateToProps = state => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
})

const mapDispatchToProps = dispatch => ({
  getRankListDispatch() {
    dispatch(rankActionCreators.getRankList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
