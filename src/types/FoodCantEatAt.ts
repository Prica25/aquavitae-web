import type Food from './Food'
import type TypeOfMeal from './TypeOfMeal'

type FoodCantEatAt = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  type_of_meal: TypeOfMeal | String
  food: Food | String
}

export default FoodCantEatAt
