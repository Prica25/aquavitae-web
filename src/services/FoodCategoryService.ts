import Api from '@/services/Api'

import type FoodCategory from '@/types/FoodCategory'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'description:ASC',
    columns = 'description' as string | string[],
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
          params.append('search', fil)
        }
      } else {
        params.append('search', filter)
      }
    }

    return Api().get(`food-category/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`food-category/get/${id}`)
  },
  post(food_category: FoodCategory) {
    return Api().post('food-category/create', food_category, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(food_category: FoodCategory) {
    return Api().patch(
      `food-category/update/${food_category.id}`,
      food_category,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  delete(id: number) {
    return Api().delete(`food-category/delete/${id}`)
  },
}
