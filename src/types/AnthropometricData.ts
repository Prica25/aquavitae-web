import type User from './User'

type AnthropometricData = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  weight: number
  height: number
  waist_circumference: number
  fat_mass: number
  muscle_mass: number
  bone_mass: number
  body_water: number
  basal_metabolism: number
  visceral_fat: number
  date?: Date
  user_id: User
  body_photo: string
}

export default AnthropometricData
