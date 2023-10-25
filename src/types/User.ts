type User = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  email: string
  password: string
  role?: string
  last_access?: string
  profile_photo?: string
}

export default User
