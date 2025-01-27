<template>
    <div class="p-6">
      <div class="bg-white rounded-lg shadow-lg">
        <div class="p-8">
          <!-- Header -->
          <div class="border-b border-gray-200 pb-6">
            <h1 class="text-2xl font-bold text-blue-900 mb-4">
              INFORMASI AGENDA RAPAT
            </h1>
            <h2 class="text-xl font-semibold text-center text-gray-800">
              {{ agenda || 'RAPAT PENGURUS PUSTIK' }}
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
                <p>Senin, 2 Desember 2024 09:00 WIB</p>
              </div>
  
              <!-- Meeting Details -->
              <div class="flex items-center space-x-2 mb-3 mt-6">
                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h3 class="text-sm font-semibold text-gray-800">Detail Rapat</h3>
              </div>
              <div class="pl-6">
                <div class="flex space-x-8 text-sm text-gray-800">
                  <p>Ruang Meeting Lt.2</p>
                  <p>PIC: Ferdian</p>
                </div>
              </div>

              <div class="flex items-center space-x-2 mb-3 mt-6">
                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h3 class="text-sm font-semibold text-gray-800">Person in Charge</h3>
              </div>
              <div class="pl-6">
                <div class="flex space-x-8 text-sm text-gray-800">
                  <p>Ferdian</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Participants Section -->
          <div class="py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">PESERTA RAPAT :</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3 bg-gray-50 p-3 rounded">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-800">AS</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Agus Setiawan</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 bg-gray-50 p-3 rounded">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-800">RM</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Rina Marlina</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 bg-gray-50 p-3 rounded">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-800">BW</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Budi Wirawan</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 bg-gray-50 p-3 rounded">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-800">SD</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Sarah Dwi</p>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-600">Status Rapat</label>
              <span class="mt-1 inline-flex px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Completed
              </span>
            </div>
          </div>
  
          <!-- Meeting Details Section -->
          <div class="py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">URAIAN RAPAT :</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-600 space-y-2">
                <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>2. Integer vel dui a leo tempor luctus non id elit.</p>
                <p>3. Sed volutpat erat quis felis vehicula, vel iaculis odio lobortis.</p>
                <p>4. Nunc tristique odio sit amet erat euismod, vitae ullamcorper.</p>
              </div>
            </div>
          </div>
  
          <!-- Suggestions Section -->
          <div class="py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">SARAN :</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-600 space-y-2">
                <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>2. Integer vel dui a leo tempor luctus non id elit.</p>
                <p>3. Sed volutpat erat quis felis vehicula, vel iaculis odio.</p>
              </div>
            </div>
          </div>
  
          <!-- Follow Up Section -->
          <div class="py-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">TINDAK LANJUT :</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-600">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt, nisi et vehicula tincidunt.</p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MeetingInfo',
    data() {
      return {
        agenda: 'RAPAT PENGURUS PUSTIK'
      }
    }
  }
  </script>