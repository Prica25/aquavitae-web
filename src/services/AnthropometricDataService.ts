import Api from '@/services/Api'

import type AnthropometricData from '@/types/AnthropometricData'

export default {
  mine() {
    return Api().get(`anthropometric-data/me/get`)
  },
  index(
    page: number,
    itemsPerPage: number,
    user_id: string,
    columns = ['weight', 'height'] as string | string[]
  ) {
    const params = new URLSearchParams()

    if (Array.isArray(columns)) {
      for (let column of columns) {
        params.append('columns', column)
      }
    } else {
      params.append('columns', columns)
    }
    params.append('skip', page.toString())
    params.append('take', itemsPerPage.toString())
    params.append('sort', 'date:DESC')
    params.append('search', `user_id:${user_id}`)

    return Api().get(`anthropometric-data/get/`, {
      params,
    })
  },
  showLast(
    user_id: string,
    columns = ['weight', 'height'] as string | string[]
  ) {
    const params = new URLSearchParams()

    if (Array.isArray(columns)) {
      for (let column of columns) {
        params.append('columns', column)
      }
    } else {
      params.append('columns', columns)
    }
    params.append('skip', '1')
    params.append('take', '1')
    params.append('sort', 'date:DESC')
    params.append('search', `user_id:${user_id}`)

    return Api().get(`anthropometric-data/get/`, {
      params,
    })
  },
  post(AnthropometricData: AnthropometricData) {
    return Api().post('anthropometric-data/create', AnthropometricData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, AnthropometricData: AnthropometricData) {
    return Api().patch(`anthropometric-data/update/${id}`, AnthropometricData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
