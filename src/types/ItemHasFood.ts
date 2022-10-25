import type Item from './Item'
import type Food from './Food'

type ItemHasFood = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  amount_grams: number
  item_id: Item
  food_id: Food
}

export default ItemHasFood
