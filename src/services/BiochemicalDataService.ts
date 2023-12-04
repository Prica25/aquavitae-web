import Api from '@/services/Api'

import type BiochemicalData from '@/types/BiochemicalData'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'total_cholesterol:ASC',
    columns = 'total_cholesterol' as string | string[],
    filter = null as string | null
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
    params.append('sort', sort)
    if (filter) {
      if (Array.isArray(filter)) {
        for (const fil of filter) {
          params.append('search', fil)
        }
      } else {
        params.append('search', filter)
      }
    }

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
