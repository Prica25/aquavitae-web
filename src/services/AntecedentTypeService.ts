import Api from '@/services/Api'

import type AntecedentType from '@/types/AntecedentType'

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

    return Api().get(`antecedent-type/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`antecedent-type/get/${id}`)
  },
  post(antecedentType: AntecedentType) {
    return Api().post('antecedent-type/create', antecedentType, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(antecedentType: AntecedentType) {
    return Api().patch(
      `antecedent-type/update/${antecedentType.id}`,
      antecedentType,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  delete(id: number) {
    return Api().delete(`antecedent-type/delete/${id}`)
  },
}
