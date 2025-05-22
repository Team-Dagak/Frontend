// src/api/axiosInstance.js
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true, // 세션쿠키 기반이면 true, JWT만 쓰면 생략 가능
})

// 요청 인터셉터 - 모든 요청에 Authorization 헤더 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// (옵션) 응답 인터셉터 - 예: 401일 때 자동 로그아웃 등
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 등 (예: localStorage.removeItem("accessToken"))
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
