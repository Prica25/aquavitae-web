import Api from '@/services/Api'

import type Diagnosis from '@/types/Diagnosis'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'description:ASC',
    columns = 'description' as string | string[],
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

    return Api().get(`diagnosis/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`diagnosis/get/${id}`)
  },
  post(diagnosis: Diagnosis) {
    return Api().post('diagnosis/create', diagnosis, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, diagnosis: Diagnosis) {
    return Api().patch(`diagnosis/update/${id}`, diagnosis, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`diagnosis/delete/${id}`)
  },
}
