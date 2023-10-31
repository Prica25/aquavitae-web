import type User from './User'
import type AntecedentType from './AntecedentType'

type Antecedent = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  description: string
  antecedent_type: AntecedentType | String
  user: User | String
}

export default Antecedent
