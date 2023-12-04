import Api from '@/services/Api'

import type Diary from '@/types/Diary'

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

    return Api().get(`diary/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`diary/get/${id}`)
  },
  post(diary: Diary) {
    return Api().post('diary/create', diary, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(diary: Diary) {
    return Api().patch(`diary/update/${diary.id}`, diary, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`diary/delete/${id}`)
  },
}
