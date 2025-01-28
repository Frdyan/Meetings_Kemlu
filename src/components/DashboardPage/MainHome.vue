<script setup>
import { ref, onMounted } from 'vue';
import { meetingService } from '@/services/meeting.services';

const latestMeetings = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await meetingService.getLatestMeetings();
    latestMeetings.value = response.data.meetings;
  } catch (err) {
    error.value = 'Gagal memuat data meeting';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6">
    <div class="bg-white rounded-lg shadow-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Latest Meetings</h2>
          <router-link 
            to="/dashboard/agenda" 
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            View All
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-6 text-center text-gray-500">
        Loading...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-6 text-center text-red-500">
        {{ error }}
      </div>

      <!-- Meetings List -->
      <div v-else class="divide-y divide-gray-100">
        <div 
          v-for="meeting in latestMeetings" 
          :key="meeting.id"
          class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium text-gray-900">{{ meeting.agenda }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ meeting.description }}</p>
            </div>
            <span class="text-sm text-gray-400">{{ new Date(meeting.schedule).toLocaleTimeString() }}</span>
          </div>
          <div class="mt-2 flex justify-between">
            <span class="text-xs text-gray-400">{{ new Date(meeting.schedule).toLocaleDateString() }}</span>
            <span class="text-xs px-2 py-1 rounded-full" 
              :class="{
                'bg-yellow-100 text-yellow-800': meeting.status === 'Scheduled',
                'bg-green-100 text-green-800': meeting.status === 'Completed',
                'bg-blue-100 text-blue-800': meeting.status === 'In Progress'
              }"
            >
              {{ meeting.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>