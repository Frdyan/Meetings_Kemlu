<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { meetingService } from '@/services/meeting.services';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);

// Form data
const formData = ref({
  agenda: '',
  room: '',
  pic: '',
  description: '',
  suggestions: '',
  follow_up: '',
  status: 'Scheduled',
  participants: [
    { name: '', initial: '' }
  ]
});

// Separate date and time for input
const dateInput = ref('');
const timeInput = ref('');

// Load existing data
onMounted(async () => {
  try {
    const id = route.query.id;
    if (!id) {
      router.push('/dashboard/agenda');
      return;
    }

    const response = await meetingService.getMeetingById(id);
    const meeting = response.data.meeting;

    // Fill form data
    formData.value = {
      agenda: meeting.agenda,
      room: meeting.room,
      pic: meeting.pic,
      description: meeting.description,
      suggestions: meeting.suggestions || '',
      follow_up: meeting.follow_up || '',
      status: meeting.status,
      participants: [...meeting.participants]
    };

    // Parse schedule to date and time
    const scheduleDate = new Date(meeting.schedule);
    dateInput.value = scheduleDate.toISOString().split('T')[0];
    timeInput.value = scheduleDate.toTimeString().slice(0, 5);

    loading.value = false;
  } catch (err) {
    error.value = 'Gagal memuat data rapat';
    console.error('Error:', err);
    loading.value = false;
  }
});

// Participant management
const addParticipant = () => {
  formData.value.participants.push({ name: '', initial: '' });
};

const removeParticipant = (index) => {
  if (formData.value.participants.length > 1) {
    formData.value.participants.splice(index, 1);
  }
};

// Handle form submission
const handleSubmit = async () => {
  try {
    loading.value = true;
    const id = route.query.id;

    // Combine date and time
    const schedule = `${dateInput.value} ${timeInput.value}:00`;

    // Prepare data for API
    const updateData = {
      ...formData.value,
      schedule
    };

    await meetingService.updateMeeting(id, updateData);
    router.push('/dashboard/agenda');
  } catch (err) {
    error.value = 'Gagal mengupdate data rapat';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-xl font-bold text-[#1a2b47] mb-6">EDIT AGENDA RAPAT</h1>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        Loading...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-4 text-red-500">
        {{ error }}
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Agenda -->
        <div>
          <label class="block text-sm font-medium text-gray-600">
            Agenda Rapat <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.agenda"
            type="text"
            required
            class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Date and Time -->
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

        <!-- Room -->
        <div>
          <label class="block text-sm font-medium text-gray-600">
            Ruangan <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.room"
            type="text"
            required
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
            class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Suggestions -->
        <div>
          <label class="block text-sm font-medium text-gray-600">
            Saran
          </label>
          <textarea 
            v-model="formData.suggestions"
            rows="3"
            class="mt-1 block w-full border rounded px-3 py-2 focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Follow Up -->
        <div>
          <label class="block text-sm font-medium text-gray-600">
            Tindak Lanjut
          </label>
          <textarea 
            v-model="formData.follow_up"
            rows="3"
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

        <!-- Participants -->
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

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <router-link 
            to="/dashboard/agenda"
            class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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