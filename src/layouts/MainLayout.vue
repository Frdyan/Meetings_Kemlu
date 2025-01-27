<script setup>
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-blue-900 text-white">
      <SideBar />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="shadow-md">
        <Header isDashboard="true" />
      </div>

      <!-- Dynamic Content -->
      <div class="flex-1 p-4 bg-gray-100 overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
/* Optional custom styles */
</style>
