<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="file"
         class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-auto bg-black bg-opacity-80"
         @click="$emit('close')">
      <div class="fixed z-20 float-right text-2xl font-bold text-white cursor-pointer top-1 right-4 hover:text-gray-50">
        x
      </div>
      <button @click.stop="handlePrevious" 
              class="fixed left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-20">
        &#8592;
      </button>
      <button @click.stop="handleNext" 
              class="fixed right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-20">
        &#8594;
      </button>
      <div class="relative z-10 text-center" @click.stop>
        <img v-if="format === 'image'"
             :src="baseUrl + file"
             class="mx-auto">
        <audio v-if="format === 'audio'"
               controls
               autoplay
               :src="baseUrl + file"></audio>
        <a class="text-white"
           :href="baseUrl + file"
           target="_blank">
          {{ baseUrl + file }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  file: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'previous', 'next'])

const handlePrevious = () => {
  emit('previous');
}

const handleNext = () => {
  emit('next');
}
</script>
