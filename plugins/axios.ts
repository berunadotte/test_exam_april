import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.API_KEY) {
    throw new Error('API_KEY is not defined')
  }

  const instance = axios.create({
    baseURL: 'https://imdb-top-100-movies.p.rapidapi.com',
    headers: {
      'x-rapidapi-key': config.public.API_KEY,
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
    },
  })

  return {
    provide: {
      axios: instance,
    },
  }
})
