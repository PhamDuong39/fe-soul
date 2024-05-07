import { defineStore } from "pinia"
import * as oauthAPI from "@/api/oauthAPI"
import router from "@/router"
import signalR from "@/signalR/signalR"

export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUser() {
      if (!this.user || this.user.id !== localStorage.getItem("userId")) {
        const res = await oauthAPI.getUserInfo()

        if (res.statusCode === 200) {
          localStorage.setItem("userId", res.data.id)
          this.user = res.data
          await signalR.startConnection()
        } else {
          await this.logout()
        }
      }

      return this.user
    },
    async login(accessToken) {
      this.user = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userId")
      localStorage.setItem("accessToken", accessToken)
      await router.replace("/")
    },
    async logout() {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userId")
      this.user = null
      await signalR.stopConnection()
    },
  },
})
