import type User from './User'
import type AntecedentType from './AntecedentType'

type Antecedent = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  antecedent_type_id: AntecedentType
  user_id: User
}

export default Antecedent
