<template>
  <div class="pagination">
    <button
      class="pagination__button"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Предыдущая
    </button>
    <span class="pagination__page"
      >Страница {{ currentPage }} из {{ totalPages }}</span
    >
    <button
      class="pagination__button"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Следующая
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '~/store/movieStore'

const store = useMovieStore()

const totalPages = computed(() =>
  Math.ceil(store.filteredMovies.length / store.itemsPerPage)
)

const currentPage = computed(() => store.currentPage)

const prevPage = () => {
  if (currentPage.value > 1) {
    store.setCurrentPage(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    store.setCurrentPage(currentPage.value + 1)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;

  &__page {
    margin: 0 10px;
  }

  &__button {
    padding: 5px 10px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
