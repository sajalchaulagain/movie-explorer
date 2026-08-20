import MovieCard from "./MovieCard.jsx";

function MovieList({ movies }) {
  return (
    <div className="mt-8">
      <h2 className="mb-5 text-2xl font-bold">Movies Found</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
