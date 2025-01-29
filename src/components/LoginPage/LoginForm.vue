<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth.services';
import backgroundImage from '@/assets/img/bg-signin.png';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const remember = ref(false);
const emailError = ref('');
const passwordError = ref('');

// Computed property untuk validasi form
const isFormValid = computed(() => {
  return email.value && 
         password.value && 
         !emailError.value && 
         !passwordError.value;
});

// Fungsi validasi email
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = 'Email harus diisi';
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Format email tidak valid';
  } else {
    emailError.value = '';
  }
};

// Fungsi validasi password
const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password harus diisi';
  } else if (password.value.length < 6) {
    passwordError.value = 'Password minimal 6 karakter';
  } else {
    passwordError.value = '';
  }
};

// Watch untuk validasi realtime
watch(email, validateEmail);
watch(password, validatePassword);

async function handleLogin() {
  // Validasi sebelum submit
  validateEmail();
  validatePassword();
  
  if (!isFormValid.value) return;

  loading.value = true;
  error.value = '';

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
      remember: remember.value
    });

    // Simpan token dan user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Jika remember me dicentang, simpan credentials
    if (remember.value) {
      localStorage.setItem('rememberedEmail', email.value);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Redirect ke dashboard
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
}

// Cek remembered email saat mounted
onMounted(() => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    email.value = rememberedEmail;
    remember.value = true;
  }
});
</script>

<template>
  <div class="h-[calc(100vh-80px)] flex items-center justify-center bg-cover bg-center px-4 md:px-0" 
       :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="bg-white bg-opacity-70 backdrop-blur-sm shadow-lg rounded-xl w-full max-w-sm sm:max-w-md">
      <div class="bg-blue-950 text-white py-4 px-6 rounded-t-xl flex justify-center">
        <h1 class="text-2xl font-semibold">Sign In</h1>
      </div>
      
      <div class="p-6">
        <div class="mb-6 text-center">
          <h2 class="text-blue-950 text-lg font-semibold">SELAMAT DATANG</h2>
          <p class="text-gray-600 text-sm mt-1">Silakan masuk untuk melanjutkan</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" 
             class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Masukkan Email Anda"
              :disabled="loading"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     transition duration-150 ease-in-out" 
              @blur="validateEmail"
            />
            <span v-if="emailError" class="text-xs text-red-500 mt-1 block">{{ emailError }}</span>
          </div>
          
          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Masukkan Password Anda"
                :disabled="loading"
                required
                minlength="6"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm shadow-sm 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 disabled:cursor-not-allowed
                       transition duration-150 ease-in-out" 
                @blur="validatePassword"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 mt-1 focus:outline-none"
              >
                <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <span v-if="passwordError" class="text-xs text-red-500 mt-1 block">{{ passwordError }}</span>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="remember"
                class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
            
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="loading || !isFormValid"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium
                   disabled:bg-green-300 disabled:cursor-not-allowed
                   transition-colors duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else>Masuk</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>