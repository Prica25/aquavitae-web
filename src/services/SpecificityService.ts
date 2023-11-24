import Api from '@/services/Api'

import type Specificity from '@/types/Specificity'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'user_id:ASC',
    columns = 'user_id' as string | string[],
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

    return Api().get(`specificity/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`specificity/get/${id}`)
  },
  post(specificity: Specificity) {
    return Api().post('specificity/create', specificity, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(specificity: Specificity) {
    return Api().patch(`specificity/update/${specificity.id}`, specificity, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`specificity/delete/${id}`)
  },
}
