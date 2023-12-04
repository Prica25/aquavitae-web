import Api from '@/services/Api'

export default {
  complete(user_id: string, nutritional_plan_id: string) {
    const params = new URLSearchParams()

    params.append('user_id', user_id)
    params.append('nutritional_plan_id', nutritional_plan_id)

    return Api().post(
      `recommendation-system/complete-nutritional-plan`,
      {},
      {
        params: params,
      }
    )
  },
}
