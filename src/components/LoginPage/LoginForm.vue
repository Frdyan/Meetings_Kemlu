<script setup>
import { ref } from 'vue';
import backgroundImage from '@/assets/img/bg-signin.png';

const email = ref('');
const password = ref('');

function handleLogin() {
  alert(`Email: ${email.value}, Password: ${password.value}`);
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-0" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="bg-white bg-opacity-70 shadow-md rounded-xl w-full max-w-sm sm:max-w-md">
      
      <div class="bg-blue-950 text-white py-4 px-6 rounded-t-xl flex justify-center">
        <h1 class="text-2xl font-semibold">Sign In</h1>
      </div>
      
      <div class="p-6">
        <div class="mb-6 text-center">
          <h2 class="text-blue-950 text-lg font-semibold">SELAMAT DATANG</h2>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" v-model="email" placeholder="Masukkan Email Anda"
                   class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Masukkan Password Anda"
                   class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-base">
            Masuk
          </button>
        </form>
        <p class="mt-4 text-center text-sm">
          Belum punya akun? <a href="#" class="text-blue-950 no-underline hover:underline">Daftar sekarang</a>
        </p>
      </div>
    </div>
  </div>
</template>
