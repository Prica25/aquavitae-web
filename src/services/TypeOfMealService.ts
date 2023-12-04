import Api from '@/services/Api'

import type TypeOfMeal from '@/types/TypeOfMeal'

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

    return Api().get(`type-of-meal/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`type-of-meal/get/${id}`)
  },
  post(typeOfMeal: TypeOfMeal) {
    typeOfMeal.calories_percentage = 0
    return Api().post('type-of-meal/create', typeOfMeal, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, typeOfMeal: TypeOfMeal) {
    return Api().patch(`type-of-meal/update/${id}`, typeOfMeal, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: string) {
    return Api().delete(`type-of-meal/delete/${id}`)
  },
}
