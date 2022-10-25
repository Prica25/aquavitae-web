import type NutritionalPlan from './NutritionalPlan'
import type MealsOfPlan from './MealsOfPlan'

type NutritionalPlanHasMeal = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  meal_date: Date
  nutritional_plan_id: NutritionalPlan
  meals_of_plan_id: MealsOfPlan
}

export default NutritionalPlanHasMeal
