<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { meetingService } from '@/services/meeting.services'

const router = useRouter()
const loading = ref(false)

const formData = ref({
  agenda: '',
  schedule: '',
  room: '',
  pic: '',
  description: '',
  suggestions: '',
  follow_up: '',
  status: 'Scheduled',
  participants: [
    { name: '', initial: '' }
  ]
})

// Untuk input tanggal dan waktu terpisah
const dateInput = ref('')
const timeInput = ref('')

const addParticipant = () => {
  formData.value.participants.push({ name: '', initial: '' })
}

const removeParticipant = (index) => {
  if (formData.value.participants.length > 1) {
    formData.value.participants.splice(index, 1)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    
    // Gabungkan date dan time
    formData.value.schedule = `${dateInput.value} ${timeInput.value}:00`
    
    await meetingService.createMeeting(formData.value)
    router.push('/dashboard/agenda')
  } catch (error) {
    console.error('Error:', error)
    alert('Gagal menambahkan rapat')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-xl font-bold text-[#1a2b47] mb-6">TAMBAH AGENDA RAPAT</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Data Rapat -->
        <div class="space-y-6">
          <!-- Agenda -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Agenda Rapat <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.agenda"
              type="text"
              required
              placeholder="Masukkan agenda rapat"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Tanggal dan Waktu -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">
                Tanggal <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="dateInput"
                type="date"
                required
                class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">
                Waktu <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="timeInput"
                type="time"
                required
                class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Ruangan -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Ruangan <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.room"
              type="text"
              required
              placeholder="Masukkan ruangan"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- PIC -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              PIC <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.pic"
              type="text"
              required
              placeholder="Masukkan PIC"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Deskripsi <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="formData.description"
              rows="4"
              required
              placeholder="Contoh:
          1. Evaluasi project Q4 2023
          2. Planning project Q1 2024
          3. Pembagian tim dan timeline"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            ></textarea>
            <span class="text-sm text-gray-500 mt-1">
              *Gunakan format penomoran (1. 2. 3.) untuk setiap poin
            </span>
          </div>

          <!-- Suggestions -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Saran
            </label>
            <textarea 
              v-model="formData.suggestions"
              rows="3"
              placeholder="Contoh:
          1. Perlu penambahan SDM
          2. Update tech stack
          3. Perlunya pelatihan"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            ></textarea>
            <span class="text-sm text-gray-500 mt-1">
              *Gunakan format penomoran (1. 2. 3.) untuk setiap poin
            </span>
          </div>

          <!-- Follow Up -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Tindak Lanjut
            </label>
            <textarea 
              v-model="formData.follow_up"
              rows="3"
              placeholder="Masukkan tindak lanjut"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select 
              v-model="formData.status"
              class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <!-- Participants Section -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-600">
            Peserta <span class="text-red-500">*</span>
          </label>
          
          <div v-for="(participant, index) in formData.participants" 
               :key="index" 
               class="flex items-center gap-4">
            <input 
              v-model="participant.name"
              type="text"
              placeholder="Nama peserta"
              required
              class="flex-1 border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            />
            <input 
              v-model="participant.initial"
              type="text"
              placeholder="Inisial"
              maxlength="2"
              required
              class="w-24 border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
            />
            <button 
              type="button"
              @click="removeParticipant(index)"
              class="text-red-500"
              :disabled="formData.participants.length === 1"
            >
              Hapus
            </button>
          </div>
          
          <button 
            type="button"
            @click="addParticipant"
            class="text-blue-500 hover:text-blue-600"
          >
            + Tambah Peserta
          </button>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3">
          <router-link 
            to="/dashboard/agenda"
            class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Batal
          </router-link>
          <button 
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>