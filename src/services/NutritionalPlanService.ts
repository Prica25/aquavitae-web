import Api from '@/services/Api'

import type NutritionalPlan from '@/types/NutritionalPlan'

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

    return Api().get(`nutritional-plan/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`nutritional-plan/get/${id}`)
  },
  post(nutritionalPlan: NutritionalPlan) {
    return Api().post('nutritional-plan/create', nutritionalPlan, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, nutritionalPlan: NutritionalPlan) {
    return Api().patch(`nutritional-plan/update/${id}`, nutritionalPlan, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`nutritional-plan/delete/${id}`)
  },
}
