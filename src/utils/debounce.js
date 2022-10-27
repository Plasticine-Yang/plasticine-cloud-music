export const debounce = (func, wait) => {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
    }, wait)
  }
}
