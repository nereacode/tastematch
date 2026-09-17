import type { TMDBMovie } from './api/tmdb'

export type MovieFeatures = {
  emotional: number
  intellectual: number
  exciting: number
  atmospheric: number
  slowPaced: number
  complexStory: number
  openEnding: number
  characterDriven: number
}

const genreFeatures: Record<number, Partial<MovieFeatures>> = {
  // Action
  28: {
    exciting: 9,
  },

  // Adventure
  12: {
    exciting: 8,
    atmospheric: 5,
  },

  // Animation
  16: {
    atmospheric: 6,
    emotional: 5,
  },

  // Comedy
  35: {
    exciting: 5,
    emotional: 4,
  },

  // Crime
  80: {
    intellectual: 6,
    complexStory: 7,
    exciting: 6,
  },

  // Documentary
  99: {
    intellectual: 8,
    slowPaced: 6,
  },

  // Drama
  18: {
    emotional: 8,
    characterDriven: 9,
    slowPaced: 6,
  },

  // Family
  10751: {
    emotional: 6,
    atmospheric: 5,
  },

  // Fantasy
  14: {
    atmospheric: 9,
    exciting: 6,
  },

  // History
  36: {
    intellectual: 7,
    emotional: 6,
    slowPaced: 6,
  },

  // Horror
  27: {
    exciting: 8,
    atmospheric: 8,
  },

  // Music
  10402: {
    emotional: 7,
    atmospheric: 7,
  },

  // Mystery
  9648: {
    intellectual: 8,
    complexStory: 9,
    openEnding: 6,
  },

  // Romance
  10749: {
    emotional: 9,
    characterDriven: 8,
  },

  // Science Fiction
  878: {
    intellectual: 8,
    atmospheric: 8,
    complexStory: 7,
  },

  // Thriller
  53: {
    exciting: 8,
    complexStory: 7,
    openEnding: 5,
  },

  // War
  10752: {
    emotional: 7,
    exciting: 7,
    complexStory: 6,
  },

  // Western
  37: {
    atmospheric: 7,
    exciting: 6,
  },
}

export function getMovieFeatures(
  movie: TMDBMovie,
): MovieFeatures {
  const features: MovieFeatures = {
    emotional: 0,
    intellectual: 0,
    exciting: 0,
    atmospheric: 0,
    slowPaced: 0,
    complexStory: 0,
    openEnding: 0,
    characterDriven: 0,
  }

  movie.genre_ids.forEach((genreId) => {
    const genre = genreFeatures[genreId]

    if (!genre) {
      return
    }

    Object.entries(genre).forEach(([key, value]) => {
      const featureKey = key as keyof MovieFeatures
      features[featureKey] += value ?? 0
    })
  })

  return features
}