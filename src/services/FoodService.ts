import Api from '@/services/Api'

import type Food from '@/types/Food'

export default {
  index() {
    return Api().get(`food/get`)
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
