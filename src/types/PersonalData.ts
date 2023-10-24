import type ActivityLevel from './ActivityLevel'
import type User from './User'

type PersonalData = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  first_name: string
  last_name: string
  birthday: Date
  occupation: string
  food_history: string
  bedtime: string
  wake_up: string
  gender: string
  activity_level: ActivityLevel
  user: User
}

export default PersonalData
