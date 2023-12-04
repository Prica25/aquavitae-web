import type TypeOfMeal from './TypeOfMeal'

type MealsOfPlan = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  description: string
  start_time: string
  end_time: string
  type_of_meal: TypeOfMeal | string
  type_of_meal_id: TypeOfMeal | string
}

export default MealsOfPlan
