import Api from '@/services/Api'

import type Antecedent from '@/types/Antecedent'

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

    return Api().get(`antecedent/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`antecedent/get/${id}`)
  },
  post(antecedent: Antecedent) {
    return Api().post('antecedent/create', antecedent, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(antecedent: Antecedent) {
    return Api().patch(`antecedent/update/${antecedent.id}`, antecedent, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`antecedent/delete/${id}`)
  },
}
