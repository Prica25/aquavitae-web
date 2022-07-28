import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: () => ({
    user: null,
    access_token: null,
    expires_in: null,
    token_type: null,
  }),
  getters: {
    getToken: (state): string | null =>
      state.token_type ? `${state.token_type} ${state.access_token}` : null,
    getName: (state): string => (state.user as any)?.name,
  },
  actions: {
    login(data: any) {
      this.user = data.user
      this.access_token = data.access_token
      this.expires_in = data.expires_in
      this.token_type = data.token_type
    },
    logout() {
      this.user = null
      this.access_token = null
      this.expires_in = null
      this.token_type = null
    },
  },
})
