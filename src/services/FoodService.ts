import Api from '@/services/Api'

import type Food from '@/types/Food'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'description:ASC',
    filter = null as string | null
  ) {
    let params = { skip: page, take: itemsPerPage, sort: sort } as any
    if (filter) params.search = filter

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
