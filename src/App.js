import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './style'

import router from './router'

import store from './store'

import SingerContext from './application/Singers/singer-context'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>

      {/* 歌手列表页 context */}
      <SingerContext>
        <RouterProvider router={router} />
      </SingerContext>
    </Provider>
  )
}

export default App
