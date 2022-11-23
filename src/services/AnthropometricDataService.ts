import Api from '@/services/Api'

import type AnthropometricData from '@/types/AnthropometricData'

export default {
  mine() {
    return Api().get(`anthropometric-data/me/get`)
  },
  show(user_id: string) {
    let params = {
      skip: 1,
      take: 1,
      search: `user_id:${user_id}`,
      sort: 'date:DESC',
    }

    return Api().get(`anthropometric-data/get/`, {
      params,
    })
  },
  post(AnthropometricData: AnthropometricData) {
    return Api().post('anthropometric-data/create', AnthropometricData)
  },
  put(AnthropometricData: AnthropometricData) {
    return Api().patch(
      `anthropometric-data/update/${AnthropometricData.id}`,
      AnthropometricData
    )
  },
}
