<template>
  <div class="catalog-item" @click="showDetails(movie)">
    <div class="catalog-item__image-container">
      <img class="catalog-item__image" :src="movie.image" :alt="movie.title" />
    </div>
    <h3 class="catalog-item__title">{{ movie.title }}</h3>
    <p class="catalog-item__year">{{ movie.year }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/types'
import { useMovieStore } from '~/store/movieStore'

const props = defineProps<{
  movie: Movie
}>()

const store = useMovieStore()

const showDetails = (movie: Movie) => {
  store.showMovieDetails(movie)
}
</script>

<style scoped lang="scss">
.catalog-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  width: 20px;
  min-width: 220px;
  height: 380px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  &__image-container {
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    height: 300px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .catalog-item:hover & {
      transform: scale(1.1);
    }
  }

  &__title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  &__year {
    margin-top: 5px;
    font-size: 14px;
    text-align: center;
    width: 100%;
  }
}
</style>
