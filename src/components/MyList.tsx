import MovieCard from './MovieCard'
import type { TMDBMovie } from '../api/tmdb'

type MyListProps = {
  movies: TMDBMovie[]
  interestedMovies: number[]
  watchedMovies: number[]
  dismissedMovies: number[]

  onInterested: (movieId: number) => void
  onWatched: (movieId: number) => void
  onDismissed: (movieId: number) => void

  onBackHome: () => void
}

function MyList({
  movies,
  interestedMovies,
  watchedMovies,
  dismissedMovies,
  onInterested,
  onWatched,
  onDismissed,
  onBackHome,
}: MyListProps) {
  const interestedList = movies.filter((movie) =>
    interestedMovies.includes(movie.id),
  )

  const watchedList = movies.filter((movie) =>
    watchedMovies.includes(movie.id),
  )

  return (
    <main>
      <section className="hero-section">
        <p className="eyebrow">
          TASTEMATCH / MY LIST
        </p>

        <h1>
          YOUR
          <br />
          MOVIES.
        </h1>

        <p className="hero-description">
          Movies you are interested in
          and movies you have already watched.
        </p>

        <button
          className="secondary-button"
          onClick={onBackHome}
        >
          Back to home
        </button>
      </section>

      <section className="movie-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">INTERESTED</p>

            <h2>
              {interestedList.length} MOVIES.
            </h2>
          </div>
        </div>

        {interestedList.length === 0 ? (
          <p>No movies here yet.</p>
        ) : (
          <div className="movie-grid">
            {interestedList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                mode="interested"
                isInterested={interestedMovies.includes(movie.id)}
                isWatched={watchedMovies.includes(movie.id)}
                isDismissed={dismissedMovies.includes(movie.id)}
                onInterested={onInterested}
                onWatched={onWatched}
                onDismissed={onDismissed}
              />
            ))}
          </div>
        )}
      </section>

      <section className="movie-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WATCHED</p>

            <h2>
              {watchedList.length} MOVIES.
            </h2>
          </div>
        </div>

        {watchedList.length === 0 ? (
          <p>No movies here yet.</p>
        ) : (
          <div className="movie-grid">
            {watchedList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                mode="watched"
                isInterested={interestedMovies.includes(movie.id)}
                isWatched={watchedMovies.includes(movie.id)}
                isDismissed={dismissedMovies.includes(movie.id)}
                onInterested={onInterested}
                onWatched={onWatched}
                onDismissed={onDismissed}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default MyList