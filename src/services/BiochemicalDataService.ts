import Api from '@/services/Api'

import type BiochemicalData from '@/types/BiochemicalData'

export default {
  index(
    page: number,
    itemsPerPage: number,
    appointment_id: string,
    columns = ['total_proteins'] as string | string[]
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
    params.append('sort', 'total_proteins:DESC')
    params.append('search', `appointment_id:${appointment_id}`)

    return Api().get(`biochemical-data/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`biochemical-data/get/${id}`)
  },
  post(biochemicalData: BiochemicalData) {
    return Api().post('biochemical-data/create', biochemicalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, biochemicalData: BiochemicalData) {
    return Api().patch(`biochemical-data/update/${id}`, biochemicalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`biochemical-data/delete/${id}`)
  },
}
