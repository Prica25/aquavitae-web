import Api from '@/services/Api'

import type MealsOptions from '@/types/MealsOptions'

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

    return Api().get(`meals-options/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`meals-options/get/${id}`)
  },
  post(mealsOptions: MealsOptions) {
    return Api().post('meals-options/create', mealsOptions, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, mealsOptions: MealsOptions) {
    return Api().patch(`meals-options/update/${id}`, mealsOptions, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`meals-options/delete/${id}`)
  },
}
