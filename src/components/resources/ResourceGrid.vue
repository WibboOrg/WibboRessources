<template>
  <Transition
    enter-active-class="duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="files.length"
         :key="filesPage.join(',')"
         class="grid grid-cols-1 gap-2 p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      <div v-for="(file, index) in filesPage"
           :key="index"
           :class="modelValue === file ? 'border-2' : ''"
           class="relative w-full h-24 col-span-1 p-2 overflow-hidden bg-black border-gray-400 rounded cursor-pointer bg-opacity-10 dark:bg-opacity-40 group dark:border-white hover:border-2"
           @click="$emit('update:modelValue', file)">
        <img v-if="format === 'image'"
             :src="baseUrl + file"
             loading="lazy"
             class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <span v-if="type !== 'avatar'"
              :class="format !== 'audio' ? 'transition opacity-0 group-hover:opacity-100' : ''"
              class="absolute text-sm text-gray-400 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {{ fileName(file) }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { modelValue, files, filesPage, baseUrl, format, type } = defineProps<{
  modelValue: string
  files: string[]
  filesPage: string[]
  baseUrl: string
  format: string
  type?: string
}>()
const emit = defineEmits(['update:modelValue'])

const fileName = (file: string) => file.split('/').pop() || ''
</script>
