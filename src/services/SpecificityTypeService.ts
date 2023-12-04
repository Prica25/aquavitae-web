import Api from '@/services/Api'

import type SpecificityType from '@/types/SpecificityType'

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

    return Api().get(`specificity-type/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`specificity-type/get/${id}`)
  },
  post(specificityType: SpecificityType) {
    return Api().post('specificity-type/create', specificityType, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: String, specificityType: SpecificityType) {
    return Api().patch(`specificity-type/update/${id}`, specificityType, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`specificity-type/delete/${id}`)
  },
}
