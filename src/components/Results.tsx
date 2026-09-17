import MovieCard from './MovieCard'
import type { TMDBMovie } from '../api/tmdb'

type TasteScores = {
  emotional: number
  intellectual: number
  exciting: number
  atmospheric: number
  slowPaced: number
  complexStory: number
  openEnding: number
  characterDriven: number
}

type Recommendation = {
  movie: TMDBMovie
  matchScore: number
  matchingPreferences: string[]
}

type ResultsProps = {
  recommendations: Recommendation[]
  userScores: TasteScores

  interestedMovies: number[]
  watchedMovies: number[]
  dismissedMovies: number[]

  onInterested: (movieId: number) => void
  onWatched: (movieId: number) => void
  onDismissed: (movieId: number) => void

  onBackHome: () => void
  onRetakeQuiz: () => void
}

function Results({
  recommendations,
  userScores,
  interestedMovies,
  watchedMovies,
  dismissedMovies,
  onInterested,
  onWatched,
  onDismissed,
  onBackHome,
  onRetakeQuiz,
}: ResultsProps) {
  const preferences = Object.entries(userScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key]) => {
      const labels: Record<string, string> = {
        emotional: 'Emotional',
        intellectual: 'Intellectual',
        exciting: 'Exciting',
        atmospheric: 'Atmospheric',
        slowPaced: 'Slow-paced',
        complexStory: 'Complex story',
        openEnding: 'Open endings',
        characterDriven: 'Character-driven',
      }

      return labels[key]
    })

  return (
    <main>
      <section className="hero-section">
        <p className="eyebrow">
          TASTEMATCH / RESULTS
        </p>

        <h1>
          MOVIES
          <br />
          FOR YOU.
        </h1>

        <p className="hero-description">
          Based on your answers, your taste
          leans toward:
        </p>

        <div className="preference-tags">
          {preferences.map((preference) => (
            <span
              key={preference}
              className="preference-tag"
            >
              {preference}
            </span>
          ))}
        </div>

        <div className="hero-actions">
          <button
            className="secondary-button"
            onClick={onRetakeQuiz}
          >
            Retake quiz
          </button>

          <button
            className="secondary-button"
            onClick={onBackHome}
          >
            Back to home
          </button>
        </div>
      </section>

      <section className="movie-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              YOUR MATCHES
            </p>

            <h2>
              {recommendations.length} MOVIES.
            </h2>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <p>
            No recommendations found.
          </p>
        ) : (
          <div className="movie-grid">
            {recommendations.map(
              ({
                movie,
                matchScore,
              }) => (
                <div
                  key={movie.id}
                  className="recommendation-card"
                >
                  <div className="match-score">
                    {matchScore}% MATCH
                  </div>

                  <MovieCard
                    movie={movie}
                    mode="recommendation"
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
                </div>
              ),
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default Results