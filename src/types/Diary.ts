import type NutritionalPlanHasMeal from './NutritionalPlanHasMeal'

type Diary = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  item_id: string
  nutritional_plan_has_meal_id: NutritionalPlanHasMeal
}

export default Diary
