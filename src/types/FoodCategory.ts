type FoodCategory = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  description: string
  level: number
  food_category: FoodCategory
}

export default FoodCategory
