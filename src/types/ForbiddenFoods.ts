import type Food from './Food'
import type NutritionalPlan from './NutritionalPlan'

type ForbiddenFoods = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  food_id: Food
  nutritional_plan_id: NutritionalPlan
}

export default ForbiddenFoods
