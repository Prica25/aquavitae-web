import type User from './User'

type NutritionalPlan = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  calories_limit: number
  lipids_limit: number
  proteins_limit: number
  carbohydrates_limit: number
  period_limit: number
  active: boolean
  user_id: User
}

export default NutritionalPlan
