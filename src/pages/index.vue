<template>
  <div>
    <TheNavbar 
      :category-selected="categorySelected"
      @open-search="isSearchOpen = true" 
      @load-page="loadPage" />

    <ResourceCount
      :count="files.length"
      :format="currentCategory?.format"
    />

    <section class="h-screen overflow-y-scroll md:pt-10 overflow-y-overlay">
      <ResourceGrid
        v-model="fileModal"
        :files="files"
        :files-page="filesPage"
        :category-selected="categorySelected"
        :page-current="pageCurrent"
        :base-url="baseUrl"
        :format="currentCategory?.format || 'image'"
        :type="currentCategory?.type"
      />
      <footer class="w-full p-2 text-center text-gray-400 mb-4">
        JasonDhose © {{ new Date().getFullYear() }}
      </footer>
    </section>

    <ThePagination
      :page-id="pageCurrent"
      :page-count="pageCount"
      @go-to="goTo"
    />

    <ResourceModal
      :file="fileModal"
      :format="currentCategory?.format || 'image'"
      :base-url="baseUrl"
      @close="fileModal = ''"
      @previous="goToPrevious"
      @next="goToNext"
    />

    <TheSearch
      v-model:is-open="isSearchOpen"
      @search="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import type { CategoryKey } from '~/constants/api'

const route = useRoute()
const fileModal = ref('')
const currentFileIndex = reactive({ value: 0 })

const { 
  files,
  currentCategory,
  categorySelected,
  baseUrl,
  fileName,
  loadPage 
} = useResources()

const { 
  pageCurrent,
  pageCount,
  paginatedItems: filesPage,
  goTo 
} = usePagination(files)

const {
  isSearchOpen,
  searchText,
  filterItems
} = useSearch()

const handleSearch = async (text: string) => {
  searchText.value = text
  if (!text) {
    await loadPage(categorySelected.value)
    return
  }
  files.value = filterItems(files.value, fileName)
}

const goToPrevious = () => {
  currentFileIndex.value = (currentFileIndex.value - 1 + files.value.length) % files.value.length;
  fileModal.value = files.value[currentFileIndex.value];
}

const goToNext = () => {
  currentFileIndex.value = (currentFileIndex.value + 1) % files.value.length;
  fileModal.value = files.value[currentFileIndex.value];
}

watch(fileModal, (newFile) => {
  currentFileIndex.value = files.value.indexOf(newFile);
});

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
    event.preventDefault();
    isSearchOpen.value = true;
  } else if (event.key === 'ArrowLeft') {
    goToPrevious();
  } else if (event.key === 'ArrowRight') {
    goToNext();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

onMounted(async () => {
  const urlCategory = route.query.category as CategoryKey || categorySelected.value

  await loadPage(urlCategory)
})
</script>
