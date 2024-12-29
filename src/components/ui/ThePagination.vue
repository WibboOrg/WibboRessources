<template>
  <div class="fixed z-10 flex w-auto p-2 bg-white rounded dark:bg-black bottom-2 right-4 bg-opacity-10 dark:bg-opacity-60 backdrop-blur">
    <span class="flex flex-row p-1">
      <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click="goTo(1)">«</a>
      <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click="goTo(pageId - 1)">‹</a>
      <div class="px-2 border-r border-black cursor-pointer dark:border-white" v-show="pageId > 4">…</div>

      <a v-for="index in 5" 
         v-show="pageId - index > 0 && pageId - index != pageId"
         class="px-2 border-r border-black cursor-pointer dark:border-white" 
         @click="goTo(pageId - index)">
        {{ pageId - index }}
      </a>
      
      <a class="px-2 font-bold border-r border-black cursor-pointer dark:border-white" 
         @click="goTo(pageId)">
        {{ pageId }}
      </a>
      
      <a v-for="index in 5" 
         v-show="pageId + index <= pageCount"
         class="px-2 border-r border-black cursor-pointer dark:border-white" 
         @click="goTo(pageId + index)">
        {{ pageId + index }}
      </a>

      <div class="px-2 border-r border-black cursor-pointer dark:border-white" 
           v-show="pageId <= pageCount - 4">…</div>
      <a class="px-2 border-r border-black cursor-pointer dark:border-white" 
         @click="goTo(pageId + 1)">›</a>
      <a class="px-2 cursor-pointer" 
         @click="goTo(pageCount)">»</a>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pageId: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['goTo'])

const goTo = (page: number) => {
  if (page > 0 && page <= props.pageCount) {
    emit('goTo', page)
  }
}
</script>
