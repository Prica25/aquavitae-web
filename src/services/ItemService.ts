import Api from '@/services/Api'

import type Food from '@/types/Food'

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

    return Api().get(`item/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`item/get/${id}`)
  },
  post(food: Food) {
    return Api().post('item/create', food, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(food: Food) {
    return Api().patch(`item/update/${food.id}`, food, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`item/delete/${id}`)
  },
}
