<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header Section -->
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-xl font-bold text-[#1a2b47]">AGENDA RAPAT</h1>
      
      <div class="flex flex-col gap-2">
        <!-- Search Bar -->
        <div class="flex items-center gap-2 justify-end">
          <span class="text-gray-600">Cari :</span>
          <input 
            type="text" 
            class="border rounded px-3 py-1.5 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" 
          />
          <button class="bg-blue-500 text-white px-6 py-1.5 rounded hover:bg-blue-600">
            Cari
          </button>
        </div>

        <!-- Date Range -->
        <div class="flex items-center gap-2 justify-end">
          <span class="text-gray-600">Periode :</span>
          <input 
            type="text" 
            placeholder="dd/mm/yyyy"
            class="border rounded px-3 py-1.5 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div> - </div>
          <input 
            type="text" 
            placeholder="dd/mm/yyyy"
            class="border rounded px-3 py-1.5 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button class="bg-blue-500 text-white px-6 py-1.5 rounded hover:bg-blue-600">
            Cari
          </button>
        </div>
      </div>
    </div>

    <!-- Add Button -->
    <router-link 
    to="/dashboard/agenda/add-rapat"
    class="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 inline-block">
      Tambah +
    </router-link>

    <!-- Table -->
     <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Hari</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Nama Rapat</th>
          <th class="border border-gray-300 px-4 py-2 text-left">PIC</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Uraian</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Saran</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Tindak Lanjut</th>
          <th class="border border-gray-300 px-4 py-2 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-300 px-4 py-2">1</td>
          <td class="border border-gray-300 px-4 py-2">Selasa</td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2"></td>
          <td class="border border-gray-300 px-4 py-2">
            <div class="flex justify-center gap-2">
              <button class="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button class="p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button class="p-1.5 bg-red-500 text-white rounded hover:bg-red-600">
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

<script setup>
import { RouterLink } from 'vue-router';
</script>