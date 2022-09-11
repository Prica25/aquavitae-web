import Api from '@/services/Api'

import type Food from '@/types/Food'

export default {
  index(page: number, itemsPerPage: number, sort = 'description:ASC') {
    return Api().get(`food/get`, {
      params: {
        skip: page,
        take: itemsPerPage,
        sort: sort,
      },
    })
  },
  show(id: number) {
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
