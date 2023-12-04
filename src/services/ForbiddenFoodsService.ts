import Api from '@/services/Api'

import type ForbiddenFoods from '@/types/ForbiddenFoods'

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

    return Api().get(`forbidden-foods/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`forbidden-foods/get/${id}`)
  },
  post(forbiddenFoods: ForbiddenFoods) {
    return Api().post('forbidden-foods/create', forbiddenFoods, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, forbiddenFoods: ForbiddenFoods) {
    return Api().patch(`forbidden-foods/update/${id}`, forbiddenFoods, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`forbidden-foods/delete/${id}`)
  },
}
