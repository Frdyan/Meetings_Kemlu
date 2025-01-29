<script setup>
import { ref, onMounted, computed } from 'vue';
import { meetingService } from '@/services/meeting.services';
import { RouterLink } from 'vue-router';
import MeetingStats from './MeetingStats.vue';

const meetings = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const startDate = ref('');
const endDate = ref('');

onMounted(async () => {
  try {
    const response = await meetingService.getAllMeetings();
    meetings.value = response.data.meetings;
  } catch (err) {
    error.value = 'Gagal memuat data meeting';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
});

const filteredMeetings = computed(() => {
  return meetings.value.filter(meeting => {
    const matchesSearch = meeting.agenda.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         meeting.pic.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const meetingDate = new Date(meeting.schedule);
    const start = startDate.value ? new Date(startDate.value) : null;
    const end = endDate.value ? new Date(endDate.value) : null;
    
    const matchesDate = (!start || meetingDate >= start) && (!end || meetingDate <= end);
    
    return matchesSearch && matchesDate;
  });
});

const handleDelete = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus meeting ini?')) {
    try {
      await meetingService.deleteMeeting(id);
      meetings.value = meetings.value.filter(meeting => meeting.id !== id);
    } catch (err) {
      alert('Gagal menghapus meeting');
      console.error('Error:', err);
    }
  }
};
</script>

<template>
  <div class="p-6">
    <MeetingStats :meetings="meetings" />
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-xl font-bold text-[#1a2b47]">AGENDA RAPAT</h1>
      
        <div class="flex flex-col gap-2">
          <!-- Search Bar -->
          <div class="flex items-center gap-2 justify-end">
            <span class="text-gray-600">Cari :</span>
            <input 
              v-model="searchQuery"
              type="text" 
              class="border rounded px-3 py-1.5 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" 
            />
          </div>

          <!-- Date Range -->
          <div class="flex items-center gap-2 justify-end">
            <span class="text-gray-600">Periode :</span>
            <input 
              v-model="startDate"
              type="date"
              class="border rounded px-3 py-1.5 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div> - </div>
            <input 
              v-model="endDate"
              type="date"
              class="border rounded px-3 py-1.5 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Add Button -->
      <router-link 
        to="/dashboard/agenda/add-rapat"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 inline-block"
      >
        Tambah +
      </router-link>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        Loading...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-4 text-red-500">
        {{ error }}
      </div>

      <!-- Table -->
      <table v-else class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">No</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Nama Rapat</th>
            <th class="border border-gray-300 px-4 py-2 text-left">PIC</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(meeting, index) in filteredMeetings" :key="meeting.id">
            <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td> 
            <td class="border border-gray-300 px-4 py-2">
              {{ new Date(meeting.schedule).toLocaleDateString() }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ meeting.agenda }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ meeting.pic }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <span class="px-2 py-1 rounded-full text-sm" 
                :class="{
                  'bg-yellow-100 text-yellow-800': meeting.status === 'Scheduled',
                  'bg-green-100 text-green-800': meeting.status === 'Completed',
                  'bg-blue-100 text-blue-800': meeting.status === 'In Progress',
                  'bg-red-100 text-red-800': meeting.status === 'Cancelled'
                }"
              >
                {{ meeting.status }}
              </span>
            </td>
                      <td class="border border-gray-300 px-4 py-2">
            <div class="flex justify-center gap-2">
              <!-- View Button -->
              <router-link 
                :to="`/dashboard/agenda/view-rapat?id=${meeting.id}`"
                class="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </router-link>

              <!-- Edit Button -->
              <!-- Edit Button -->
              <router-link 
                :to="`/dashboard/agenda/edit-rapat?id=${meeting.id}`"
                class="p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </router-link>

              <!-- Delete Button -->
              <button 
                @click="handleDelete(meeting.id)"
                class="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>