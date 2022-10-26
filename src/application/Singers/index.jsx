import React, { useState } from 'react'
import { alphaTypes, categoryTypes } from '../../api'
import HorizontalScroll from '../../base-ui/HorizontalScroll'
import { HorizontalScrollContainer } from '../../base-ui/HorizontalScroll/style'

function Singers() {
  const [activeCategoryKey, setActiveCategoryKey] = useState('1001')
  const [activeAlphaKey, setActiveAlphaKey] = useState('A')

  return (
    <HorizontalScrollContainer>
      {/* 歌手分类 */}
      <HorizontalScroll
        list={categoryTypes}
        label={'分类(默认热门):'}
        activeItemKey={activeCategoryKey}
        onItemClick={categoryKey => setActiveCategoryKey(categoryKey)}
      />

      {/* 首字母 */}
      <HorizontalScroll
        list={alphaTypes}
        label={'首字母'}
        activeItemKey={activeAlphaKey}
        onItemClick={alphaKey => setActiveAlphaKey(alphaKey)}
      />
    </HorizontalScrollContainer>
  )
}

export default React.memo(Singers)
