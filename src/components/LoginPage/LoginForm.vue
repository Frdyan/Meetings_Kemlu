<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth.services';
import backgroundImage from '@/assets/img/bg-signin.png';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true;
  error.value = '';

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    });

    // Simpan token dan user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    // Redirect ke dashboard
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-0" 
       :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="bg-white bg-opacity-70 shadow-md rounded-xl w-full max-w-sm sm:max-w-md">
      <div class="bg-blue-950 text-white py-4 px-6 rounded-t-xl flex justify-center">
        <h1 class="text-2xl font-semibold">Sign In</h1>
      </div>
      
      <div class="p-6">
        <div class="mb-6 text-center">
          <h2 class="text-blue-950 text-lg font-semibold">SELAMAT DATANG</h2>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Masukkan Email Anda"
              :disabled="loading"
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="Masukkan Password Anda"
              :disabled="loading"
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-base disabled:bg-green-300"
          >
            {{ loading ? 'Loading...' : 'Masuk' }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm">
          Belum punya akun? <a href="#" class="text-blue-950 no-underline hover:underline">Daftar sekarang</a>
        </p>
      </div>
    </div>
  </div>
</template>