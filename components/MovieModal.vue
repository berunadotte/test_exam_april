<template>
  <transition name="modal">
    <div
      v-if="showModal && selectedMovie"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <img
          class="modal-content__image"
          :src="selectedMovie.big_image"
          :alt="selectedMovie.title"
        />
        <h2 class="modal-content__title">{{ selectedMovie.title }}</h2>
        <p class="modal-content__description">
          {{ selectedMovie.description }}
        </p>
        <p class="modal-content__info">Год: {{ selectedMovie.year }}</p>
        <p class="modal-content__info">Рейтинг: {{ selectedMovie.rating }}</p>
        <p class="modal-content__info">
          Жанр: {{ selectedMovie.genre.join(', ') }}
        </p>
        <p class="modal-content__info">
          Место в топе: {{ selectedMovie.rank }}
        </p>
        <button class="modal-content__button" @click="closeModal">
          Закрыть
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '~/store/movieStore'

const store = useMovieStore()

const selectedMovie = computed(() => store.selectedMovie)
const showModal = computed(() => store.showModal)

const closeModal = () => {
  store.closeModal()
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  text-align: center;

  &__image {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    border-radius: 8px;
  }

  &__title {
    margin-top: 10px;
  }

  &__description {
    margin: 10px 0;
  }

  &__info {
    margin: 10px 0;
  }

  &__button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
