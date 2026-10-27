import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apis.divtec.me/api/elden-ring',
})

export default api
