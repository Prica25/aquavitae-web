import Api from '@/services/Api'

import type AppointmentGoal from '@/types/AppointmentGoal'

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

    return Api().get(`appointment-goal/get`, {
      params,
    })
  },
  show(id: string) {
    return Api().get(`appointment-goal/get/${id}`)
  },
  post(appointmentGoal: AppointmentGoal) {
    return Api().post('appointment-goal/create', appointmentGoal, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  put(appointmentGoal: AppointmentGoal) {
    return Api().patch(
      `appointment-goal/update/${appointmentGoal.id}`,
      appointmentGoal,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
  delete(id: number) {
    return Api().delete(`appointment-goal/delete/${id}`)
  },
}
