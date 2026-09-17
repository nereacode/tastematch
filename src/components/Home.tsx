
import { useState } from 'react'
import MovieCard from './MovieCard'

import {
  searchMovies,
  type TMDBMovie,
} from '../api/tmdb'

type HomeProps = {
  movies: TMDBMovie[]

  interestedMovies: number[]
  watchedMovies: number[]
  dismissedMovies: number[]

  onStartMatching: () => void
  onStartMood: () => void
  onOpenMyList: () => void

  onInterested: (
    movieId: number,
  ) => void

  onWatched: (
    movieId: number,
  ) => void

  onDismissed: (
    movieId: number,
  ) => void
}

function Home({
  movies,
  interestedMovies,
  watchedMovies,
  dismissedMovies,
  onStartMatching,
  onStartMood,
  onOpenMyList,
  onInterested,
  onWatched,
  onDismissed,
}: HomeProps) {
  const [searchQuery, setSearchQuery] =
    useState('')

  const [searchResults, setSearchResults] =
    useState<TMDBMovie[]>([])

  const [isSearching, setIsSearching] =
    useState(false)

  async function handleSearch() {
    const query =
      searchQuery.trim()

    if (!query) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    try {
      const results =
        await searchMovies(query)

      setSearchResults(results)
    } catch (error) {
      console.error(
        'Movie search error:',
        error,
      )

      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main>
      <section className="hero-section">
        <p className="eyebrow">
          TASTEMATCH / 01
        </p>

        <h1>
          FIND MOVIES
          <br />
          THAT FEEL LIKE YOU.
        </h1>

        <p className="hero-description">
          A movie recommendation
          experience based on
          your personality,
          taste, and current mood.
        </p>

        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={
              onStartMatching
            }
          >
            Start matching
          </button>

          <button
            className="secondary-button"
            onClick={
              onStartMood
            }
          >
            Check your mood
          </button>

          <button
            className="secondary-button"
            onClick={
              onOpenMyList
            }
          >
            My List
          </button>
        </div>
      </section>

      <section className="movie-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              SEARCH
            </p>

            <h2>
              FIND A MOVIE.
            </h2>
          </div>
        </div>

        <div className="movie-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === 'Enter'
              ) {
                handleSearch()
              }
            }}
          />

          <button
            className="secondary-button"
            onClick={
              handleSearch
            }
          >
            Search
          </button>
        </div>

        {searchQuery.trim() && (
          <div className="search-results">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  SEARCH RESULTS
                </p>

                <h2>
                  {searchResults.length}{' '}
                  MOVIES.
                </h2>
              </div>
            </div>

            {isSearching && (
              <p>
                Searching...
              </p>
            )}

            {!isSearching &&
              searchResults.length ===
                0 && (
                <p>
                  No movies found.
                </p>
              )}

            {!isSearching &&
              searchResults.length >
                0 && (
                <div className="movie-grid">
                  {searchResults.map(
                    (movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        mode="search"
                        isInterested={interestedMovies.includes(
                          movie.id,
                        )}
                        isWatched={watchedMovies.includes(
                          movie.id,
                        )}
                        isDismissed={dismissedMovies.includes(
                          movie.id,
                        )}
                        onInterested={
                          onInterested
                        }
                        onWatched={
                          onWatched
                        }
                        onDismissed={
                          onDismissed
                        }
                      />
                    ),
                  )}
                </div>
              )}
          </div>
        )}
      </section>

      <section className="movie-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              POPULAR NOW
            </p>

            <h2>
              MOVIES TO EXPLORE.
            </h2>
          </div>
        </div>

        <div className="movie-grid">
          {movies
            .slice(0, 50)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                mode="home"
                isInterested={interestedMovies.includes(
                  movie.id,
                )}
                isWatched={watchedMovies.includes(
                  movie.id,
                )}
                isDismissed={dismissedMovies.includes(
                  movie.id,
                )}
                onInterested={
                  onInterested
                }
                onWatched={
                  onWatched
                }
                onDismissed={
                  onDismissed
                }
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Home

