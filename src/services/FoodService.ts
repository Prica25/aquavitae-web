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
    if (filter) params.append('search', filter)

    return Api().get(`food/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`food/get/${id}`)
  },
  post(food: Food) {
    return Api().post('food/create', food)
  },
  put(food: Food) {
    return Api().patch(`food/update/${food.id}`, food)
  },
  delete(id: number) {
    return Api().delete(`food/delete/${id}`)
  },
}
