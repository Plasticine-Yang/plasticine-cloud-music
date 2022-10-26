import { axiosInstance } from '../../utils'

/** @description 获取轮播图数据 */
const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

/** @description 获取推荐歌单数据 */
const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

export { getBannerRequest, getRecommendListRequest }
