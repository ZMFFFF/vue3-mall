import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
  state() {
    return {
      user: null
    }
  },
  actions: {
    setUser(payload) {
      this.user = payload
    },
    removeUser() {
      this.user = null
    }
  },
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [
      {
        key: 'userInfo',
        storage: localStorage,
      },
    ],
  }
})