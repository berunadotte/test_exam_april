import { defineStore } from 'pinia'
import axios from 'axios'
import type { Movie } from '~/types/types'
import moviesData from '~/assets/movies_db.json'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    movies: [] as Movie[],
    filteredMovies: [] as Movie[],
    currentPage: 1,
    itemsPerPage: 10,
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
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
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
  },
})
