import { createBrowserRouter, Navigate } from 'react-router-dom'

import Home from '../application/Home'
import Rank from '../application/Rank'
import Recommend from '../application/Recommend'
import Singers from '../application/Singers'
import Album from '../application/Album'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      // 默认跳转到推荐列表
      {
        path: '/',
        element: <Navigate replace to={'/recommend'} />,
      },
      {
        path: '/recommend',
        element: <Recommend />,
        children: [
          {
            path: ':rid',
            element: <Album />,
          },
        ],
      },
      {
        path: '/singers',
        element: <Singers />,
      },
      {
        path: '/rank',
        element: <Rank />,
      },
    ],
  },
])

export default router
