<script setup>
import { ref, onMounted, computed } from 'vue';
import { meetingService } from '@/services/meeting.services';

const latestMeetings = ref([]);
const loading = ref(true);
const error = ref(null);

const meetingStats = computed(() => {
  if (!latestMeetings.value.length) return {
    total: 0,
    completed: 0,
    inProgress: 0,
    scheduled: 0,
    cancelled: 0
  };

  return {
    total: latestMeetings.value.length,
    completed: latestMeetings.value.filter(m => m.status === 'Completed').length,
    inProgress: latestMeetings.value.filter(m => m.status === 'In Progress').length,
    scheduled: latestMeetings.value.filter(m => m.status === 'Scheduled').length,
    cancelled: latestMeetings.value.filter(m => m.status === 'Cancelled').length
  };
});

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
  <!-- Meeting Summary Stats -->
  <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Completed</h3>
      <p class="text-2xl font-bold mt-2">{{ meetingStats.completed }}</p>
    </div>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">In Progress</h3>
      <p class="text-2xl font-bold mt-2">{{ meetingStats.inProgress }}</p>
    </div>
    
    <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Scheduled</h3>
      <p class="text-2xl font-bold mt-2">{{ meetingStats.scheduled }}</p>
    </div>

    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Cancelled</h3>
      <p class="text-2xl font-bold mt-2">{{ meetingStats.cancelled }}</p>
    </div>
  </div>
</template>