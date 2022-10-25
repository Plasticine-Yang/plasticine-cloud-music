/**
 * @description 数字超过 10000 时用中文进行简写 -- 如 20000 -> 2万
 */
export const formatNumber = number => {
  if (number < 0) return
  if (number < 10000) {
    return number
  } else if (Math.floor(number / 10000) < 10000) {
    return Math.floor(number / 1000) / 10 + '万'
  } else {
    return Math.floor(number / 10000000) / 10 + '亿'
  }
}
