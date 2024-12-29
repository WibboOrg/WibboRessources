<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isOpen"
         class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-auto bg-black bg-opacity-80"
         @click="close">
      <div class="fixed z-20 float-right text-2xl font-bold text-white cursor-pointer top-1 right-4 hover:text-gray-50"
           @click="close">
        x
      </div>
      <div class="relative z-10">
        <input ref="searchInput"
               v-model="searchText"
               type="text"
               @click.stop
               placeholder="Rechercher un fichier"
               class="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none">
        <button @click="close"
                class="w-full px-3 py-2 bg-green-700 rounded hover:bg-green-800">
          Fermer
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isOpen', 'search'])

const searchText = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const close = () => {
  emit('update:isOpen', false)
}

watch(searchText, (newValue) => {
  emit('search', newValue)
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})
</script>
