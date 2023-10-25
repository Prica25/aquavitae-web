import type ActivityLevel from './ActivityLevel'
import type User from './User'

type PersonalData = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  first_name: string
  last_name: string
  birthday: Date | string
  occupation?: string
  food_history?: string
  bedtime: string
  wake_up: string
  gender: string
  activity_level?: ActivityLevel | string
  user: User | string
}

export default PersonalData
