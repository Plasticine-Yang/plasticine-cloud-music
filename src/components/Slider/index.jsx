import React, { useEffect, useState } from 'react'

import Swiper, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { SliderContainer } from './style'

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    // 初始化 swiper 实例
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        modules: [Pagination],
        pagination: { el: '.swiper-pagination' },
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map(slider => (
            <div className="swiper-slide" key={slider.imageUrl}>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
