import Api from '@/services/Api'

import type ActivityLevel from '@/types/ActivityLevel'

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

    return Api().get(`activity-level/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`activity-level/get/${id}`)
  },
  post(activityLevel: ActivityLevel) {
    return Api().post('activity-level/create', activityLevel, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(activityLevel: ActivityLevel) {
    return Api().patch(
      `activity-level/update/${activityLevel.id}`,
      activityLevel,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  delete(id: number) {
    return Api().delete(`activity-level/delete/${id}`)
  },
}
