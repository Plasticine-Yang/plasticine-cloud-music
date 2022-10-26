import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import PropTypes from 'prop-types'

import BScroll from 'better-scroll'
import { ScrollContainer } from './style'

const Scroll = forwardRef((props, ref) => {
  // ================ destruct props ================
  // normal props
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props

  // callback props
  const { pullUp, pullDown, onScroll } = props

  // ================ better scroll ================
  const [betterScrollInstance, setBetterScrollInstance] = useState()

  // better scroll 实例需要用到的 DOM 元素
  const scrollContainerRef = useRef()

  // better scroll 实例的初始化只会在组件挂载的时候执行一次
  useEffect(() => {
    if (scrollContainerRef.current) {
      const betterScrollInstance = new BScroll(scrollContainerRef.current, {
        scrollX: direction === 'horizontal',
        scrollY: direction === 'vertical',
        probeType: 3,
        click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
      })

      setBetterScrollInstance(betterScrollInstance)

      // 组件卸载时执行该函数销毁 better scroll 实例
      return () => {
        setBetterScrollInstance(null)
      }
    }
    // eslint-disable-next-line
  }, [])

  // 每次组件重新渲染时都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && betterScrollInstance) {
      betterScrollInstance.refresh()
    }
  })

  // 给实例绑定 scroll 事件处理器
  useEffect(() => {
    if (!betterScrollInstance || !onScroll) return

    betterScrollInstance.on('scroll', position => {
      onScroll(position)
    })

    // 组件卸载时取消 scroll 事件监听器
    return () => {
      betterScrollInstance.off('scroll')
    }
  }, [betterScrollInstance, onScroll])

  // 上拉到底时执行 pullUp 回调
  useEffect(() => {
    if (!betterScrollInstance || !pullUp) return

    betterScrollInstance.on('scrollEnd', () => {
      if (betterScrollInstance.y <= betterScrollInstance.maxScrollY + 100) {
        // 上拉到距离底部还有 100 个单位时就执行 pullUp 回调
        pullUp()
      }
    })

    return () => {
      betterScrollInstance.off('scrollEnd')
    }
  }, [betterScrollInstance, pullUp])

  // 下拉长度超过 50 个单位时就触发 pullDown 回调
  useEffect(() => {
    if (!betterScrollInstance || !pullDown) return

    betterScrollInstance.on('touchEnd', position => {
      if (position.y > 50) {
        pullDown()
      }
    })

    return () => {
      betterScrollInstance.off('touchEnd')
    }
  }, [betterScrollInstance, pullDown])

  // 暴露 refresh 和 getBetterScrollInstance 方法给外界
  useImperativeHandle(ref, () => ({
    /** @description 刷新 BetterScroll 实例并回到顶部 */
    refresh() {
      if (betterScrollInstance) {
        betterScrollInstance.refresh()
        betterScrollInstance.scrollTo(0, 0, 300)
      }
    },

    /** @description 获取 BetterScroll 实例对象 */
    getBetterScrollInstance() {
      if (betterScrollInstance) {
        return betterScrollInstance
      }
    },
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
  )
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

export default Scroll
