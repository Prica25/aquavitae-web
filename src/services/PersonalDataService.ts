import Api from '@/services/Api'

import type PersonalData from '@/types/PersonalData'

export default {
  mine() {
    return Api().get(`personal-data/me/get`)
  },
  show(personalDataId: string) {
    return Api().get(`personal-data/get/${personalDataId}`)
  },
  post(personalData: PersonalData) {
    return Api().post('personal-data/create', personalData)
  },
  put(personalData: PersonalData) {
    return Api().patch(`personal-data/update/${personalData.id}`, personalData)
  },
}
