import Api from '@/services/Api'

import type User from '@/types/User'

export default {
  index() {
    return Api().get(`user/get`)
  },
  show(id: number) {
    return Api().get(`user/get/${id}`)
  },
  post(user: User) {
    return Api().post('user/create', user)
  },
  put(user: User) {
    return Api().patch(`user/update/${user.id}`, user)
  },
  delete(id: number) {
    return Api().delete(`user/delete/${id}`)
  },

  /* Special */
  login(username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return Api().post('login', params)
  },
}
