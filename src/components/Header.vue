<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import logo from '../assets/img/logo kemlu.png'

const userName = ref('');
const { logout } = useAuth();

defineProps({
  isDashboard: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    userName.value = user.name;
  }
});

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await logout();
  }
}
</script>

<template>
  <header class="p-4" :class="isDashboard ? 'bg-white text-white' : 'bg-white'">
    <div class="container mx-auto flex items-center justify-between">
      <img :src="logo" alt="Logo" class="h-12" />
      <div v-if="isDashboard" class="flex items-center space-x-4">
        <span class="text-black">Selamat Datang, {{ userName }}</span>
        <button 
          @click="handleLogout"
          class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200"
        >
          Keluar
        </button>
      </div>
    </div>
  </header>
</template>