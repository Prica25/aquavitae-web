import Api from '@/services/Api'

import type User from '@/types/User'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'email:ASC',
    columns = 'email' as string | string[],
    filter = null as string | string[] | null
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
          if (fil) {
            params.append('search', fil)
          }
        }
      } else {
        params.append('search', filter)
      }
    }

    return Api().get(`user/get`, {
      params,
    })
  },
  show(id: number) {
    return Api().get(`user/get/${id}`)
  },
  post(user: User) {
    if (user.role) {
      return Api().post('user/with-role/create', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      return Api().post('user/create', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
  put(id: string, user: User) {
    return Api().patch(`user/update/${id}`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
