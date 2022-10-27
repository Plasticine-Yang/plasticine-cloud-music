import React from 'react'
import { Loading } from './style'

function PullLoading() {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span> 拼命加载中...</span>
    </Loading>
  )
}

export default React.memo(PullLoading)
