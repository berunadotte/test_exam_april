import { ref } from 'vue'
import type { Movie } from '~/types/types'

export function useMovie() {
  const selectedMovie = ref<Movie | null>(null)
  const showModal = ref(false)

  const showMovieDetails = (movie: Movie) => {
    selectedMovie.value = movie
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  return {
    selectedMovie,
    showModal,
    showMovieDetails,
    closeModal,
  }
}
