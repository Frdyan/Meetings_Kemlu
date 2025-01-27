<script setup>
import logo from '../assets/img/logo kemlu.png'
defineProps({
  isDashboard: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <header class="p-4" :class="isDashboard ? 'bg-white text-white' : 'bg-white'">
    <div class="container mx-auto flex items-center justify-between">
      <img :src="logo" alt="Logo" class="h-12" />
      <div v-if="isDashboard" class="flex items-center space-x-4">
        <span class="text-black">Selamat Datang, Ferdian</span>
        <button class="bg-red-600 text-white px-3 py-1 rounded">Keluar</button>
      </div>
    </div>
  </header>
</template>
