import type User from './User'

type Diagnosis = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  secondary: string
  bowel_function: string
  send_by_doctor: boolean
  user_id: User
}

export default Diagnosis
