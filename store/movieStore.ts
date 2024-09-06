import { defineStore } from 'pinia'
import type { Movie } from '~/types/types'
import moviesData from '~/assets/movies_db.json'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movie[],
    filteredMovies: [] as Movie[],
    currentPage: 1,
    itemsPerPage: 10,
    selectedMovie: null as Movie | null,
    showModal: false,
  }),
  actions: {
    async fetchMovies($axios: any) {
      try {
        if (process.env.NODE_ENV === 'development') {
          this.movies = moviesData as Movie[]
          this.filteredMovies = moviesData as Movie[]
        } else {
          const response = await $axios.get('/')
          this.movies = response.data
          this.filteredMovies = response.data
        }
      } catch (error) {}
    },
    filterMovies(query: string) {
      this.filteredMovies = this.movies.filter((movie) => {
        return Object.values(movie).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      })

      this.setCurrentPage(1)
    },
    setCurrentPage(page: number) {
      this.currentPage = page
    },
    showMovieDetails(movie: Movie) {
      this.selectedMovie = movie
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
})
