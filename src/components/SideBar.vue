<template>
  <aside class="h-screen flex flex-col">
    <div class="bg-white p-8 flex justify-center items-center">
      <img 
        src="@/assets/img/logo kemlu.png" 
        alt="Logo" 
        class="w-48"
      />
    </div>

    <nav class="bg-[#1a2b47] flex-1">
      <div class="flex flex-col">
        <router-link 
          to="/dashboard"
          class="px-6 py-4 text-white border-b border-gray-600 transition-colors flex items-center gap-2"
          :class="{
            'bg-blue-800 font-bold': $route.path === '/dashboard',
            'hover:bg-blue-700': $route.path !== '/dashboard'
          }"
        >
          <LayoutDashboard class="w-4 h-4" />
          Dashboard
        </router-link>

        <router-link 
          to="/dashboard/agenda"
          class="px-6 py-4 text-white border-b border-gray-600 transition-colors flex items-center gap-2"
          :class="{
            'bg-blue-800 font-bold': $route.path === '/dashboard/agenda',
            'hover:bg-blue-700': $route.path !== '/dashboard/agenda'
          }"
        >
          <Calendar class="w-4 h-4" />
          Agenda Rapat
        </router-link>

        <button 
          @click="handleLogout"
          class="px-6 py-4 text-white transition-colors flex items-center gap-2 w-full text-left hover:bg-blue-700"
        >
          <LogOut class="w-4 h-4" />
          Keluar
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { LayoutDashboard, Calendar, LogOut } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()

const handleLogout = async () => {
  // Optional: Tambahkan konfirmasi sebelum logout
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await logout()
  }
}
</script>