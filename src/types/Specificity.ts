import type Food from './Food'
import type User from './User'
import type SpecificityType from './SpecificityType'

type Specificity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  specificity_type_id: SpecificityType
  food_id: Food
  user_id: User
}

export default Specificity
