import axios from 'axios'
import router from '../router'
import { useUserStore } from '@/stores/user'

export default () => {
  const store = useUserStore()

  let cliente = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: store?.getToken || '',
    },
  })

  cliente.interceptors.response.use(
    (response) => response,
    (error) => {
      type DetailError = {
        msg: string
      }

      if (
        error.response?.data?.status_code === 401 &&
        error.response?.data?.detail?.find(
          (m: DetailError) => m.msg === 'Invalid credentials.'
        ) === -1
      ) {
        router.push('/login')
      }

      throw error
    }
  )

  return cliente
}
