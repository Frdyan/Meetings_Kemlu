<!-- components/MeetingStats.vue -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
  meetings: {
    type: Array,
    required: true
  }
});

const stats = computed(() => {
  return {
    total: props.meetings.length,
    scheduled: props.meetings.filter(m => m.status === 'Scheduled').length,
    completed: props.meetings.filter(m => m.status === 'Completed').length,
    inProgress: props.meetings.filter(m => m.status === 'In Progress').length,
    cancelled: props.meetings.filter(m => m.status === 'Cancelled').length
  };
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
    <!-- Total Meetings -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Total Meetings</h3>
      <p class="text-2xl font-bold text-blue-600 mt-2">{{ stats.total }}</p>
    </div>

    <!-- Scheduled -->
    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Scheduled</h3>
      <p class="text-2xl font-bold text-yellow-600 mt-2">{{ stats.scheduled }}</p>
    </div>

    <!-- In Progress -->
    <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">In Progress</h3>
      <p class="text-2xl font-bold text-blue-600 mt-2">{{ stats.inProgress }}</p>
    </div>

    <!-- Completed -->
    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Completed</h3>
      <p class="text-2xl font-bold text-green-600 mt-2">{{ stats.completed }}</p>
    </div>

    <!-- Cancelled -->
    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <h3 class="text-gray-600 text-sm font-medium">Cancelled</h3>
      <p class="text-2xl font-bold text-red-600 mt-2">{{ stats.cancelled }}</p>
    </div>
  </div>
</template>