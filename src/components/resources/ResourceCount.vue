<template>
  <div v-if="count" 
       class="fixed z-10 flex w-auto p-2 font-bold bg-white rounded dark:bg-black top-2 right-4 bg-opacity-10 dark:bg-opacity-60 backdrop-blur">
    {{ format === 'image' ? 'Images' : 'Sons' }}: {{ count.toLocaleString() }}
  </div>
</template>

<script setup lang="ts">
const { count, format } = defineProps<{
  count: number
  format?: string
}>()
</script>
