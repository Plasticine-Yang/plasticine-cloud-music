import React from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Tab, TabItem, Top } from './style'

function Home() {
  const navTabItem = (path, title) => (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'selected' : undefined)}
    >
      <TabItem>
        <span>{title}</span>
      </TabItem>
    </NavLink>
  )

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>

      <Tab>
        {/* 推荐页 */}
        {navTabItem('/recommend', '推荐')}

        {/* 歌手页 */}
        {navTabItem('/singers', '歌手')}

        {/* 排行榜页 */}
        {navTabItem('/rank', '排行榜')}
      </Tab>

      <Outlet />
    </div>
  )
}

export default React.memo(Home)
