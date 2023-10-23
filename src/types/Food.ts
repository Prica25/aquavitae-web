import type FoodCategory from './FoodCategory'

type Food = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  description: string
  proteins: number
  lipids: number
  carbohydrates: number
  energy_value: number
  potassium: number
  phosphorus: number
  sodium: number
  food_category_id: number
  food_category?: FoodCategory
}

export default Food
