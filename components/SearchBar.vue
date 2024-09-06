<template>
  <div class="search-bar">
    <input
      class="search-bar__input"
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Поиск..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '~/store/movieStore'

const store = useMovieStore()
const searchQuery = ref('')

const handleSearch = () => {
  store.filterMovies(searchQuery.value)
  store.setCurrentPage(1)
}
</script>

<style scoped lang="scss">
.search-bar {
  width: 100%;

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
}
</style>
