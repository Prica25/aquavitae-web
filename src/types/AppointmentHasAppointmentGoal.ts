import type Appointment from './Appointment'
import type AppointmentGoal from './AppointmentGoal'

type AppointmentHasAppointmentGoal = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  appointment_id: Appointment
  appointment_goal_id: AppointmentGoal
}

export default AppointmentHasAppointmentGoal
