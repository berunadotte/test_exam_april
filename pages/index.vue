<template>
  <div class="catalog-page">
    <img class="catalog-page__logo" src="~/assets/IMDB_Logo.svg" alt="IMDB logo" >
    <div class="catalog-page__controls">
      <SearchBar class="catalog-page__search-bar" />
      <div class="catalog-page__view-controls">
        <label class="switch">
          <input type="checkbox" v-model="isHorizontal" />
          <span class="slider"></span>
        </label>
        <span class="view-label">{{
          isHorizontal ? 'Карусель' : 'Плиточный'
        }}</span>
      </div>
    </div>
    
    <div v-if="!isHorizontal" class="catalog-page__catalog grid">
      <CatalogItem
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
        @show-details="showMovieDetails"
      />
    </div>
    <div v-else class="catalog-page__catalog carousel">
      <button class="carousel-button prev" @click="prevSlide">&#10094;</button>
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 200}px)` }">
          <CatalogItem
            v-for="movie in paginatedMovies"
            :key="movie.id"
            :movie="movie"
            @show-details="showMovieDetails"
          />
        </div>
      </div>
      <button class="carousel-button next" @click="nextSlide">&#10095;</button>
    </div>
    <Pagination class="catalog-page__pagination" />
    <MovieModal
      :selectedMovie="selectedMovie"
      :showModal="showModal"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMovieStore } from '~/store/movieStore'
import SearchBar from '~/components/SearchBar.vue'
import CatalogItem from '~/components/CatalogItem.vue'
import Pagination from '~/components/Pagination.vue'
import MovieModal from '~/components/MovieModal.vue'
import { useNuxtApp } from '#app'
import type { Movie } from '~/types/types'

const { $axios } = useNuxtApp()
const store = useMovieStore()
const isHorizontal = ref(false)
const currentIndex = ref(0)

onMounted(() => {
  store.fetchMovies($axios)
})

const paginatedMovies = computed(() => {
  const start = (store.currentPage - 1) * store.itemsPerPage
  const end = start + store.itemsPerPage
  return store.filteredMovies.slice(start, end)
})

const selectedMovie = computed(() => store.selectedMovie)
const showModal = computed(() => store.showModal)

const showMovieDetails = (movie: Movie) => {
  store.showMovieDetails(movie)
}

const closeModal = () => {
  store.closeModal()
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextSlide = () => {
  if (currentIndex.value < paginatedMovies.value.length - 4) {
    currentIndex.value++
  }
}
</script>

<style scoped lang="scss">
.catalog-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__logo {
    width: 100px;
    margin-bottom: 10px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  &__search-bar {
    flex-grow: 1;
    margin-right: 20px;
    max-width: 400px;
  }

  &__view-controls {
    margin-left: 20px;
    display: flex;
    align-items: center;

    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      margin-right: 10px;

      input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
          background-color: #007bff;
        }

        &:checked + .slider:before {
          transform: translateX(20px);
        }
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 20px;

        &:before {
          position: absolute;
          content: '';
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
      }
    }

    .view-label {
      font-size: 14px;
    }
  }

  &__catalog {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    position: relative;
    justify-items: center;

    &.grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    &.carousel {
      overflow: hidden;
    }
  }

  &__pagination {
    margin-top: 20px;
  }
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  z-index: 1;

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
}

.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}
</style>