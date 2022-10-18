import { createBrowserRouter } from 'react-router-dom'

import Home from '../application/Home'
import Rank from '../application/Rank'
import Recommend from '../application/Recommend'
import Singers from '../application/Singers'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      // 默认跳转到推荐列表
      {
        index: true,
        element: <Recommend />,
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
