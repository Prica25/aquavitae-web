import Api from '@/services/Api'

import type PersonalData from '@/types/PersonalData'

export default {
  mine() {
    return Api().get(`personal-data/me/get`)
  },
  show(users_id: string | string[]) {
    const params = new URLSearchParams()

    if (Array.isArray(users_id)) {
      for (let user_id of users_id) {
        params.append('users_id', user_id)
      }
    } else {
      params.append('users_id', users_id)
    }

    return Api().get(`personal-data/users/get`, {
      params: params,
    })
  },
  post(personalData: PersonalData) {
    return Api().post('personal-data/create', personalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(personalData: PersonalData) {
    return Api().patch(
      `personal-data/update/${personalData.id}`,
      personalData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
}
