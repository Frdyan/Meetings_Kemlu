<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { meetingService } from '@/services/meeting.services';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);
const meeting = ref({
  agenda: '',
  schedule: '',
  room: '',
  pic: '',
  description: '',
  suggestions: '',
  follow_up: '',
  status: '',
  participants: []
});

onMounted(async () => {
  try {
    const id = route.query.id;
    if (!id) {
      router.push('/dashboard/agenda');
      return;
    }

    const response = await meetingService.getMeetingById(id);
    meeting.value = response.data.meeting;
  } catch (err) {
    error.value = 'Gagal memuat data rapat';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
});

// Helper untuk format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <div class="p-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      Loading...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4 text-red-500">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else class="bg-white rounded-lg shadow-lg">
      <div class="p-8">
        <!-- Header -->
        <div class="border-b border-gray-200 pb-6">
          <h1 class="text-2xl font-bold text-blue-900 mb-4">
            INFORMASI AGENDA RAPAT
          </h1>
          <h2 class="text-xl font-semibold text-center text-gray-800">
            {{ meeting.agenda }}
          </h2>
        </div>

        <!-- Basic Info -->
        <div class="py-6 border-b border-gray-200">
          <div class="bg-gray-50 rounded-lg p-4">
            <!-- Meeting Schedule -->
            <div class="flex items-center space-x-2 mb-3">
              <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
              <h3 class="text-sm font-semibold text-gray-800">Jadwal Rapat</h3>
            </div>
            <div class="pl-6 text-sm text-gray-800">
              <p>{{ formatDate(meeting.schedule) }}</p>
            </div>

            <!-- Meeting Details -->
            <div class="flex items-center space-x-2 mb-3 mt-6">
              <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
              <h3 class="text-sm font-semibold text-gray-800">Detail Rapat</h3>
            </div>
            <div class="pl-6">
              <div class="flex space-x-8 text-sm text-gray-800">
                <p>{{ meeting.room }}</p>
                <p>PIC: {{ meeting.pic }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Participants Section -->
        <div class="py-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">PESERTA RAPAT :</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="participant in meeting.participants" 
                 :key="participant.id" 
                 class="flex items-center space-x-3 bg-gray-50 p-3 rounded">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-blue-800">{{ participant.initial }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ participant.name }}</p>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-600">Status Rapat</label>
            <span class="mt-1 inline-flex px-3 py-1 text-sm font-medium rounded-full"
                  :class="{
                    'text-yellow-700 bg-yellow-100': meeting.status === 'Scheduled',
                    'text-green-700 bg-green-100': meeting.status === 'Completed',
                    'text-blue-700 bg-blue-100': meeting.status === 'In Progress'
                  }">
              {{ meeting.status }}
            </span>
          </div>
        </div>

        <!-- Meeting Details Section -->
        <div class="py-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">URAIAN RAPAT :</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 whitespace-pre-line">
              {{ meeting.description }}
            </div>
          </div>
        </div>

        <!-- Suggestions Section -->
        <div class="py-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">SARAN :</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 whitespace-pre-line">
              {{ meeting.suggestions }}
            </div>
          </div>
        </div>

        <!-- Follow Up Section -->
        <div class="py-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">TINDAK LANJUT :</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 whitespace-pre-line">
              {{ meeting.follow_up }}
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="mt-6 flex justify-end">
          <router-link 
            to="/dashboard/agenda"
            class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Kembali
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>