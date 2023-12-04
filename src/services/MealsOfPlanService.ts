import Api from '@/services/Api'

import type MealsOfPlan from '@/types/MealsOfPlan'

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

    return Api().get(`meals-of-plan/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`meals-of-plan/get/${id}`)
  },
  post(mealsOfPlan: MealsOfPlan) {
    return Api().post('meals-of-plan/create', mealsOfPlan, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(id: string, mealsOfPlan: MealsOfPlan) {
    return Api().patch(`meals-of-plan/update/${id}`, mealsOfPlan, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete(id: number) {
    return Api().delete(`meals-of-plan/delete/${id}`)
  },
}
