import React from 'react'

import { useNavigate } from 'react-router'

import LazyLoad from 'react-lazyload'

import { List, ListItem, ListWrapper } from './style'

import { formatNumber } from '../../../../utils'

function RecommendList(props) {
  const navigate = useNavigate()

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map(item => {
          return (
            <ListItem
              key={item.id}
              onClick={() => navigate(`/recommend/${item.id}`)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  // 图片未加载时使用默认图片占位
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png')}
                      alt="music"
                    />
                  }
                >
                  {/* 加此参数可以减小请求的图片资源大小 */}
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{formatNumber(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
