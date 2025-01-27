<template>
  <div class="p-6">
    <!-- Main Container -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header -->
      <h1 class="text-xl font-bold text-[#1a2b47] mb-6">TAMBAH AGENDA RAPAT</h1>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- First Row - Hari, Tanggal & Waktu -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Hari -->
          <div>
            <label for="hari" class="block text-sm font-medium text-gray-600">
              Hari <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="formData.day"
              id="hari"
              required
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Pilih Hari</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>

          <!-- Tanggal -->
          <div>
            <label for="tanggal" class="block text-sm font-medium text-gray-600">
              Tanggal <span class="text-red-500">*</span>
            </label>
            <input 
              type="date"
              v-model="formData.date"
              id="tanggal"
              required
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>

          <!-- Waktu -->
          <div>
            <label for="waktu" class="block text-sm font-medium text-gray-600">
              Waktu <span class="text-red-500">*</span>
            </label>
            <input 
              type="time"
              v-model="formData.time"
              id="waktu"
              required
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Second Row - Nama Rapat & Lokasi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nama Rapat -->
          <div>
            <label for="agenda" class="block text-sm font-medium text-gray-600">
              Nama Rapat <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              v-model="formData.agenda"
              id="agenda"
              required
              placeholder="Masukkan nama rapat"
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>

          <!-- Lokasi -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-600">
              Lokasi
            </label>
            <input 
              type="text"
              v-model="formData.location"
              id="location"
              placeholder="Masukkan lokasi rapat"
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Third Row - PIC & Peserta -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- PIC -->
          <div>
            <label for="pic" class="block text-sm font-medium text-gray-600">
              PIC <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              v-model="formData.pic"
              id="pic"
              required
              placeholder="Masukkan nama PIC"
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>

          <!-- Peserta -->
          <div>
            <label for="participants" class="block text-sm font-medium text-gray-600">
              Peserta <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              v-model="formData.participants"
              id="participants"
              required
              placeholder="Masukkan nama peserta"
              class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-600">
            Status <span class="text-red-500">*</span>
          </label>
          <select 
            v-model="formData.status"
            id="status"
            required
            class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Uraian -->
        <div>
          <label for="details" class="block text-sm font-medium text-gray-600">
            Uraian <span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model="formData.details"
            id="details"
            rows="3"
            required
            placeholder="Masukkan uraian rapat"
            class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Saran -->
        <div>
          <label for="suggestions" class="block text-sm font-medium text-gray-600">
            Saran
          </label>
          <textarea 
            v-model="formData.suggestions"
            id="suggestions"
            rows="3"
            placeholder="Masukkan saran (opsional)"
            class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Tindak Lanjut -->
        <div>
          <label for="follow_up" class="block text-sm font-medium text-gray-600">
            Tindak Lanjut
          </label>
          <textarea 
            v-model="formData.follow_up"
            id="follow_up"
            rows="3"
            placeholder="Masukkan tindak lanjut (opsional)"
            class="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <router-link 
            to="/dashboard/agenda"
            class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          >
            Kembali
          </router-link>
          <button 
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const days = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu'
]

const formData = ref({
  day: '',
  date: '',
  time: '',
  agenda: '',
  location: '',
  pic: '',
  participants: '',
  status: 'Scheduled',
  details: '',
  suggestions: '',
  follow_up: '',
  created_by: '', // This will be set from your auth system
})

const handleSubmit = () => {
  // Handle form submission
  console.log(formData.value)
  // Add your API call here
}
</script>