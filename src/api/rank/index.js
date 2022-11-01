import { axiosInstance } from '../../utils'

/** @description 获取所有榜单内容摘要 */
const getRankListRequest = () => {
  return axiosInstance.get('/toplist/detail')
}

export { getRankListRequest }
