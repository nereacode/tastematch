
import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
})

export type TMDBMovie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export async function getPopularMovies(): Promise<TMDBMovie[]> {
  const response = await tmdb.get('/movie/popular')

  return response.data.results
}

export function getPosterUrl(
  posterPath: string | null,
): string | null {
  if (!posterPath) {
    return null
  }

  return `https://image.tmdb.org/t/p/w500${posterPath}`
}

export async function searchMovies(
  query: string,
): Promise<TMDBMovie[]> {
  const response = await tmdb.get('/search/movie', {
    params: {
      query,
    },
  })

  return response.data.results
}
