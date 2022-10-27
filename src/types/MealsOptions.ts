import type Item from './Item'
import type NutritionalPlanHasMeal from './NutritionalPlanHasMeal'

type MealsOptions = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  suggested_by_system: boolean
  item_id: Item
  nutritional_plan_has_meal_id: NutritionalPlanHasMeal
}

export default MealsOptions
