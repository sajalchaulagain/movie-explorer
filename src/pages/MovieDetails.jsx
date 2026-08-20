import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { requestOmdb } from "../api/omdb.js";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovieDetails() {
            if (!id) {
                setMovie(null);
                setError("Movie ID is missing from the URL.");
                return;
            }

            try {
                setLoading(true);
                setError("");
                setMovie(await requestOmdb({ i: id, plot: "full" }, controller.signal));
            } catch (requestError) {
                if (requestError.name === "AbortError") return;
                setMovie(null);
                setError(requestError.message || "Something went wrong while fetching movie details.");
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
        return () => controller.abort();
    }, [id]);

    const posterAvailable = movie && movie.Poster && movie.Poster !== "N/A";

    return (
        <main className="mx-auto my-8 w-[90%] max-w-5xl">
            <Link
                to="/movies"
                className="mb-6 inline-block rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-indigo-400 hover:text-white"
            >
                ← Back to Movies
            </Link>

            {loading && <Loading message="Loading movie details..." />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && movie && (
                <section className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                    <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
                        <div className="bg-gray-900">
                            {posterAvailable ? (
                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} poster`}
                                    className="h-full min-h-112.5 w-full object-cover"
                                />
                            ) : (
                                <div className="flex min-h-112.5 items-center justify-center px-5 text-center text-gray-400">
                                    No Poster Available
                                </div>
                            )}
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="mb-6">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-300">
                                    {movie.Type}
                                </p>

                                <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
                                    {movie.Title}
                                </h1>

                                <p className="text-gray-300">
                                    {movie.Year} • {movie.Rated} • {movie.Runtime}
                                </p>
                            </div>

                            <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900 p-5">
                                <h2 className="mb-3 text-xl font-semibold text-white">Plot</h2>
                                <p className="leading-7 text-gray-300">{movie.Plot}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">Released</p>
                                    <p className="font-semibold text-white">{movie.Released}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">Genre</p>
                                    <p className="font-semibold text-white">{movie.Genre}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">Director</p>
                                    <p className="font-semibold text-white">{movie.Director}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">IMDb Rating</p>
                                    <p className="font-semibold text-white">{movie.imdbRating}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 sm:col-span-2">
                                    <p className="mb-1 text-sm text-gray-400">Actors</p>
                                    <p className="font-semibold text-white">{movie.Actors}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">Language</p>
                                    <p className="font-semibold text-white">{movie.Language}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                                    <p className="mb-1 text-sm text-gray-400">Country</p>
                                    <p className="font-semibold text-white">{movie.Country}</p>
                                </div>

                                <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 sm:col-span-2">
                                    <p className="mb-1 text-sm text-gray-400">IMDb ID</p>
                                    <p className="wrap-break-word font-mono text-sm font-semibold text-indigo-300">
                                        {movie.imdbID}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export default MovieDetails;
