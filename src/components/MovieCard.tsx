import type { TMDBMovie } from '../api/tmdb'

type MovieCardMode =
  | 'home'
  | 'search'
  | 'interested'
  | 'watched'
  | 'recommendation'

type MovieCardProps = {
  movie: TMDBMovie
  mode: MovieCardMode

  isInterested: boolean
  isWatched: boolean
  isDismissed: boolean

  onInterested: (movieId: number) => void
  onWatched: (movieId: number) => void
  onDismissed: (movieId: number) => void
}

function MovieCard({
  movie,
  mode,
  isInterested,
  isWatched,
  isDismissed,
  onInterested,
  onWatched,
  onDismissed,
}: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null

  const rating =
    typeof movie.vote_average === 'number'
      ? movie.vote_average.toFixed(1)
      : '—'

  return (
    <article className="movie-card">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
        />
      ) : (
        <div className="movie-placeholder">
          No poster
        </div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          {movie.release_date?.slice(
            0,
            4,
          ) || '—'}{' '}
          · {rating}
        </p>

        {mode === 'home' && (
          <div className="movie-actions">
            <button
              className="active interested"
              onClick={() =>
                onInterested(movie.id)
              }
            >
              Interested ✓
            </button>

            <button
              onClick={() =>
                onWatched(movie.id)
              }
            >
              Move to Watched
            </button>
          </div>
        )}

        {mode === 'search' && (
          <div className="movie-actions">
            <button
              className={
                isInterested
                  ? 'active interested'
                  : ''
              }
              onClick={() =>
                onInterested(movie.id)
              }
            >
              {isInterested
                ? 'Interested ✓'
                : 'Interested'}
            </button>

            <button
              className={
                isWatched
                  ? 'active watched'
                  : ''
              }
              onClick={() =>
                onWatched(movie.id)
              }
            >
              {isWatched
                ? 'Watched ✓'
                : 'Watched'}
            </button>

            <button
              className={
                isDismissed
                  ? 'active not-interested'
                  : ''
              }
              onClick={() =>
                onDismissed(movie.id)
              }
            >
              {isDismissed
                ? 'Not interested ✓'
                : 'Not interested'}
            </button>
          </div>
        )}

        {mode === 'interested' && (
          <div className="movie-actions">
            <button
              className="active interested"
              onClick={() =>
                onInterested(movie.id)
              }
            >
              Interested ✓
            </button>

            <button
              onClick={() =>
                onWatched(movie.id)
              }
            >
              Move to Watched
            </button>
          </div>
        )}

        {mode === 'watched' && (
          <div className="movie-actions">
            <button
              className="active watched"
              onClick={() =>
                onWatched(movie.id)
              }
            >
              Watched ✓
            </button>

            <button
              onClick={() =>
                onInterested(movie.id)
              }
            >
              Move to Interested
            </button>
          </div>
        )}

        {mode === 'recommendation' && (
          <div className="movie-actions">
            <button
              className={
                isInterested
                  ? 'active interested'
                  : ''
              }
              onClick={() =>
                onInterested(movie.id)
              }
            >
              {isInterested
                ? 'Interested ✓'
                : 'Interested'}
            </button>

            <button
              className={
                isWatched
                  ? 'active watched'
                  : ''
              }
              onClick={() =>
                onWatched(movie.id)
              }
            >
              {isWatched
                ? 'Watched ✓'
                : 'Watched'}
            </button>

            <button
              className={
                isDismissed
                  ? 'active not-interested'
                  : ''
              }
              onClick={() =>
                onDismissed(movie.id)
              }
            >
              {isDismissed
                ? 'Not interested ✓'
                : 'Not interested'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default MovieCard