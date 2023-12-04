import Api from '@/services/Api'

export default {
  index(
    page: number,
    itemsPerPage: number,
    sort = 'meal_date:ASC',
    columns = 'meal_date' as string | string[],
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

    return Api().get(`nutritional-plan-has-meal/get`, {
      params,
    })
  },
}
