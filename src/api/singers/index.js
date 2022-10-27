import { axiosInstance } from '../../utils'

/**
 * @description 歌手分类
 *
 * type 取值:
 * -1:全部
 * 1:男歌手
 * 2:女歌手
 * 3:乐队
 *
 * area 取值:
 * -1:全部
 * 7华语
 * 96欧美
 * 8:日本
 * 16韩国
 * 0:其他
 */
export const categoryTypes = [
  {
    key: '1001',
    name: '华语男',
    type: 1,
    area: 7,
  },
  {
    key: '1002',
    name: '华语女',
    type: 2,
    area: 7,
  },
  {
    key: '1003',
    name: '华语组合',
    type: 3,
    area: 7,
  },
  {
    key: '2001',
    name: '欧美男',
    type: 1,
    area: 96,
  },
  {
    key: '2002',
    name: '欧美女',
    type: 2,
    area: 96,
  },
  {
    key: '2003',
    name: '欧美组合',
    type: 3,
    area: 96,
  },
  {
    key: '6001',
    name: '日本男',
    type: 1,
    area: 8,
  },
  {
    key: '6002',
    name: '日本女',
    type: 2,
    area: 8,
  },
  {
    key: '6003',
    name: '日本组合',
    type: 3,
    area: 8,
  },
  {
    key: '7001',
    name: '韩国男',
    type: 1,
    area: 16,
  },
  {
    key: '7002',
    name: '韩国女',
    type: 2,
    area: 16,
  },
  {
    key: '7003',
    name: '韩国组合',
    type: 3,
    area: 16,
  },
  {
    key: '4001',
    name: '其他男歌手',
    type: 1,
    area: 0,
  },
  {
    key: '4002',
    name: '其他女歌手',
    type: 2,
    area: 0,
  },
  {
    key: '4003',
    name: '其他组合',
    type: 3,
    area: 0,
  },
]

// 歌手首字母
export const alphaTypes = [
  {
    key: 'A',
    name: 'A',
  },
  {
    key: 'B',
    name: 'B',
  },
  {
    key: 'C',
    name: 'C',
  },
  {
    key: 'D',
    name: 'D',
  },
  {
    key: 'E',
    name: 'E',
  },
  {
    key: 'F',
    name: 'F',
  },
  {
    key: 'G',
    name: 'G',
  },
  {
    key: 'H',
    name: 'H',
  },
  {
    key: 'I',
    name: 'I',
  },
  {
    key: 'J',
    name: 'J',
  },
  {
    key: 'K',
    name: 'K',
  },
  {
    key: 'L',
    name: 'L',
  },
  {
    key: 'M',
    name: 'M',
  },
  {
    key: 'N',
    name: 'N',
  },
  {
    key: 'O',
    name: 'O',
  },
  {
    key: 'P',
    name: 'P',
  },
  {
    key: 'Q',
    name: 'Q',
  },
  {
    key: 'R',
    name: 'R',
  },
  {
    key: 'S',
    name: 'S',
  },
  {
    key: 'T',
    name: 'T',
  },
  {
    key: 'U',
    name: 'U',
  },
  {
    key: 'V',
    name: 'V',
  },
  {
    key: 'W',
    name: 'W',
  },
  {
    key: 'X',
    name: 'X',
  },
  {
    key: 'Y',
    name: 'Y',
  },
  {
    key: 'Z',
    name: 'Z',
  },
]

/** @description 获取热门歌手列表 */
const getHotSingerListRequest = offset => {
  return axiosInstance.get(`/top/artists?limit=30&offset=${offset}`)
}

/** @description 获取歌手列表 */
const getSingerListRequest = (category, alpha, offset) => {
  const targetCategory = categoryTypes.find(item => item.key === category)
  const type = targetCategory.type
  const area = targetCategory.area

  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&initial=${alpha}&limit=30&offset=${offset}`,
  )
}

export { getHotSingerListRequest, getSingerListRequest }
