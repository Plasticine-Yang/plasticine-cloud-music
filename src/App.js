import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { IconStyle } from './assets/iconfont/iconfont'

import router from './router'

import { GlobalStyle } from './style'

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <RouterProvider router={router} />
    </>
  )
}

export default App
