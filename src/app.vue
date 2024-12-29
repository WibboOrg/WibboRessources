<template>
  <div class="w-screen h-screen overflow-hidden antialiased text-gray-700 bg-white dark:bg-gray-900 dark:text-white">
    <NuxtPage />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 14px;
}
::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
.overflow-y-overlay {
  overflow-y: overlay!important;
}
</style>
