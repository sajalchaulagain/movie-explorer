import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const posterAvailable = movie.Poster && movie.Poster !== "N/A";

    return (
        <article className="flex h-full flex-col overflow-hidden border border-slate-800 bg-slate-900 transition hover:border-slate-600">
            <div className="h-80 bg-slate-800">
                {posterAvailable ? (
                    <img
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-slate-400">
                        No Poster Available
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex-1">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                            {movie.Type}
                        </span>

                        <span className="text-sm text-slate-400">{movie.Year}</span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold leading-snug text-white">
                        {movie.Title}
                    </h3>

                    <p className="wrap-break-word text-sm text-slate-400">
                        IMDb ID:{" "}
                        <span className="font-mono text-amber-300">{movie.imdbID}</span>
                    </p>
                </div>

                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="mt-auto inline-block border border-slate-700 px-4 py-2.5 text-center text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300"
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}

export default MovieCard;
