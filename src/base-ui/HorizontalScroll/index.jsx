import React, { useEffect, useRef } from 'react'

import PropTypes from 'prop-types'

import Scroll from '../Scroll'

import { List, ListItem } from './style'

function HorizontalScroll(props) {
  const { list, activeItemKey, label } = props
  const { onItemClick } = props

  // 初始化内容宽度
  const listRef = useRef(null)
  useEffect(() => {
    if (listRef.current) {
      const tagEls = listRef.current.querySelectorAll('span')
      let totalWidth = 0

      Array.from(tagEls).forEach(el => {
        totalWidth += el.offsetWidth
      })

      listRef.current.style.width = `${totalWidth}px`
    }
  }, [])

  return (
    <Scroll direction="horizontal">
      <div ref={listRef}>
        <List>
          <span>{label}</span>
          {list.map(item => (
            <ListItem
              key={item.key}
              className={`${activeItemKey === item.key ? 'selected' : ''}`}
              onClick={() => onItemClick(item.key)}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Scroll>
  )
}

HorizontalScroll.propTypes = {
  // 滚动列表数据
  list: PropTypes.array,
  // 当前选中的列表项的 key
  activeItemKey: PropTypes.string,
  // 滚动列表左侧的标签
  label: PropTypes.string,
  // 点击滚动列表项时的回调 -- (key: string) => void
  onItemClick: PropTypes.func,
}

HorizontalScroll.defaultProps = {
  list: [],
  activeItemKey: '',
  label: '',
  onItemClick: null,
}

export default React.memo(HorizontalScroll)
