import type User from './User'

type Appointment = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  status: number
  user: User
}

export default Appointment
