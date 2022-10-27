import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import PropTypes from 'prop-types'

import BScroll from 'better-scroll'

import { ScrollContainer } from './style'

import { PullDownLoading, PullUpLoading } from '../PullLoading/style'

import Loading from '../Loading'
import PullLoading from '../PullLoading'

import { debounce } from '../../utils'

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
  const { onPullUp, onPullDown, onScroll } = props

  // 对上拉下拉回调进行防抖处理优化，避免频繁触发
  const onPullUpDebounce = useMemo(() => {
    return debounce(onPullUp, 300)
  }, [onPullUp])

  const onPullDownDebounce = useMemo(() => {
    return debounce(onPullDown, 300)
  }, [onPullDown])

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
    if (!betterScrollInstance || !onPullUp) return

    betterScrollInstance.on('scrollEnd', () => {
      if (betterScrollInstance.y <= betterScrollInstance.maxScrollY + 100) {
        // 上拉到距离底部还有 100 个单位时就执行 pullUp 回调
        onPullUpDebounce()
      }
    })

    return () => {
      betterScrollInstance.off('scrollEnd')
    }
  }, [betterScrollInstance, onPullUp, onPullUpDebounce])

  // 下拉长度超过 50 个单位时就触发 pullDown 回调
  useEffect(() => {
    if (!betterScrollInstance || !onPullDown) return

    betterScrollInstance.on('touchEnd', position => {
      if (position.y > 50) {
        onPullDownDebounce()
      }
    })

    return () => {
      betterScrollInstance.off('touchEnd')
    }
  }, [betterScrollInstance, onPullDown, onPullDownDebounce])

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

  const PullUpDisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' }

  const PullDownDisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑动到底部时出现的加载动画 */}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading />
      </PullUpLoading>

      {/* 滑动到顶部时出现的加载动画 */}
      <PullDownLoading style={PullDownDisplayStyle}>
        <PullLoading />
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
  onScroll: PropTypes.func, // 滑动触发的回调函数
  onPullUp: PropTypes.func, // 上拉加载逻辑
  onPullDown: PropTypes.func, // 下拉加载逻辑
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
  onScroll: null,
  onPullUp: null,
  onPullDown: null,
}

export default Scroll
