import axios from 'axios'

const apiBaseURL = 'http://localhost:4000'

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.error('axios error: ', err)
  },
)

export { axiosInstance }
