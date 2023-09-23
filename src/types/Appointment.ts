import type User from './User'
import type AppointmentStatus from '@/types/Enum/AppointmentStatus'

type Appointment = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  status: AppointmentStatus
  user: User
}

export default Appointment
