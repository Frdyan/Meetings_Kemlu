<template>
    <div class="p-6">
      <!-- Card Container -->
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Card Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">Latest Meetings</h2>
            <button class="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
        </div>
  
        <!-- Meetings List -->
        <div class="divide-y divide-gray-100">
          <!-- Meeting Item 1 -->
          <div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">Project Kickoff Meeting</h3>
                <p class="mt-1 text-sm text-gray-500">Initial discussion for the new dashboard project</p>
              </div>
              <span class="text-sm text-gray-400">09:00 AM</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">Jan 13, 2025</div>
          </div>
  
          <!-- Meeting Item 2 -->
          <div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">Weekly Team Sync</h3>
                <p class="mt-1 text-sm text-gray-500">Regular team sync to discuss progress and blockers</p>
              </div>
              <span class="text-sm text-gray-400">11:00 AM</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">Jan 13, 2025</div>
          </div>
  
          <!-- Meeting Item 3 -->
          <div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">Client Presentation</h3>
                <p class="mt-1 text-sm text-gray-500">Present the latest features to the client</p>
              </div>
              <span class="text-sm text-gray-400">02:00 PM</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">Jan 12, 2025</div>
          </div>
  
          <!-- Meeting Item 4 -->
          <div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">Design Review</h3>
                <p class="mt-1 text-sm text-gray-500">Review new design proposals for the mobile app</p>
              </div>
              <span class="text-sm text-gray-400">03:30 PM</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">Jan 12, 2025</div>
          </div>
  
          <!-- Meeting Item 5 -->
          <div class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">Sprint Planning</h3>
                <p class="mt-1 text-sm text-gray-500">Plan tasks and objectives for the next sprint</p>
              </div>
              <span class="text-sm text-gray-400">10:00 AM</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">Jan 14, 2025</div>
          </div>
        </div>
      </div>
    </div>
  </template>