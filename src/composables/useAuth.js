// src/composables/useAuth.js
import { authService } from '@/services/auth.services'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()

  const logout = async () => {
    try {
      // Panggil endpoint logout
      await authService.logout()
      
      // Hapus data dari localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Redirect ke halaman login
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    logout
  }
}