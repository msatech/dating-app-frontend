import axios from "axios"

const BASE_URL = "http://localhost:8000/api/v1"

export default axios.create({
  baseURL: BASE_URL,
  headers: { "content-type": "application/json" },
})


export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "content-type": "application/json" },
})