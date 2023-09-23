import { defineStore } from 'pinia'
import type User from '@/types/User.ts'
import type PersonalData from '@/types/PersonalData'

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: () => ({
    user: null as User | null,
    personalData: null as PersonalData | null,
    access_token: null,
    expires_in: null,
    token_type: null,
  }),
  getters: {
    getToken: (state): string | null =>
      state.token_type ? `${state.token_type} ${state.access_token}` : '',
    getName: (state): string | undefined =>
      state.personalData
        ? `${state.personalData.first_name} ${state.personalData.last_name}`
        : undefined,
    getProfilePhoto: (state): string | undefined => state.user?.profile_photo,
  },
  actions: {
    login(data: any) {
      this.user = data.user
      this.access_token = data.access_token
      this.expires_in = data.expires_in
      this.token_type = data.token_type
    },
    updatePersonalData(personalData: PersonalData) {
      this.personalData = personalData
    },
    logout() {
      this.user = null
      this.access_token = null
      this.expires_in = null
      this.token_type = null
      this.personalData = null
    },
  },
})
