import type Appointment from './Appointment'

type BiochemicalData = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  total_proteins: number
  albumin: number
  urea: number
  uric_acid: number
  creatinine: number
  total_cholesterol: number
  hdl: number
  ldl: number
  glycemia: number
  hda1c: number
  fasting_glycemia: number
  post_prandial_glycemia: number
  total_bilirubin: number
  biliburin_direct: number
  alkaline_phosphatase: number
  ast_tgo: number
  alt_tgp: number
  appointment_id: Appointment
}

export default BiochemicalData
