import React from 'react'

import { IconStyle } from './assets/iconfont/iconfont'

import { RouterProvider } from 'react-router-dom'
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
