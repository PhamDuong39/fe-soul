import axios from "../../node_modules/axios"
import router from "@/router"
import { $notification } from "./global-plugin"
import typeNotification from "@/constant/typeNotification"
import { useLanguageStore } from "@/store/language"
import { useOverlayStore, useUserStore } from "@/store"

const axiosIns = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "*/*",
  },
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("accessToken")

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ""
  }

  // Return modified config
  return config
})

axiosIns.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const languageStore = useLanguageStore()
    const overlayStore = useOverlayStore()
    const userStore = useUserStore()

    overlayStore.overlayVisible = false

    if (!error.response) {
      window.location.reload()
    }

    // Handle error
    if (error.response.status === 403) {
      $notification(
        typeNotification.error,
        languageStore.isEn ? "Not have access" : "Không có quyền truy cập",
      )
      await router.replace("/")
    } else if (error.response.status === 401) {
      if (localStorage.getItem("accessToken")) {
        await userStore.logout()
        await router.replace("/")
      } else {
        await userStore.logout()
        await router.replace("/login")
      }
    } else {
      window.location.reload()
    }
  },
)
export default axiosIns
