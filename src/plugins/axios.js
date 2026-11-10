import axios from 'axios'

// Use the API base URL configured in the environment file.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api
